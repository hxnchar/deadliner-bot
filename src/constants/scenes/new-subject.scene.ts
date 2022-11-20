import { Scenes } from 'telegraf';
import { BotContext, sendMessage, editMessageByID, cleanMessagesBin, messageToBin, deleteMessage } from '../../helpers';
import { BotReplies } from '../bot-replies.constant';
import { SceneIDs } from './scene-ids.enum';
import { NewSubjectKeyboard, CALLBACK_DATA } from '../inline-keyboards';
import { Subject } from '../../services';
import { BotCommands } from '../../constants';

const updateMessage = (ctx: BotContext) => {
  editMessageByID(
    ctx,
    BotReplies.NEW_SUBJECT(ctx.session.subject),
    NewSubjectKeyboard,
  );
};

const newSubjectScene = new Scenes.BaseScene<BotContext>(SceneIDs.NEW_SUBJECT);

newSubjectScene.enter(async (ctx) => {
  const sentMessage =
    await sendMessage(ctx,
      BotReplies.NEW_SUBJECT(ctx.session.subject),
      NewSubjectKeyboard);
  ctx.session.messageID = sentMessage.message_id;
  ctx.session.chatID = sentMessage.chat.id;

  ctx.scene.session.subjectNameInput = false;
  ctx.session.subject =
    ctx.session.subject === undefined ? new Subject() : ctx.session.subject;
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_CHANGE_NAME, async (ctx) => {
  ctx.scene.session.subjectNameInput = true;
  const sentMessage = await sendMessage(ctx, 'Please, provide a subject name');
  messageToBin(ctx, sentMessage.message_id);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_MAKE_GENERAL, (ctx) => {
  ctx.session.subject.isGeneral = true;
  updateMessage(ctx);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_MAKE_NON_GENERAL, (ctx) => {
  ctx.session.subject.isGeneral = false;
  updateMessage(ctx);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_DISCARD, (ctx) => {
  ctx.scene.leave();
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_UNDO, (ctx) => {
  try {
    const response = ctx.session.subject.undo();
    if (response) {
      updateMessage(ctx);
    }
  } catch (e: any) {
    ctx.answerCbQuery(`${e.message}`);
  }
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_RESET, (ctx) => {
  try {
    ctx.session.subject = new Subject();
    updateMessage(ctx);
  } catch (e: any) {
    ctx.answerCbQuery(`${e.message}`);
  }
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_REDO, (ctx) => {
  try {
    const response = ctx.session.subject.redo();
    if (response) {
      updateMessage(ctx);
    }
  } catch (e: any) {
    ctx.answerCbQuery(`${e.message}`);
  }
});

newSubjectScene.hears(BotCommands.NEW_SUBJECT, (ctx) => ctx.scene.reenter());

newSubjectScene.on('text',  (ctx) => {
  const inputingName = ctx.scene.session.subjectNameInput;
  if (inputingName) {
    ctx.session.subject.name = ctx.message.text;
    ctx.scene.session.subjectNameInput = false;
    messageToBin(ctx);
    updateMessage(ctx);
  }
  cleanMessagesBin(ctx);
});

newSubjectScene.leave(async (ctx) => {
  if (ctx.session.messageID) {
    try {
      deleteMessage(ctx, ctx.session.messageID);
    } catch (e: any) {
      ctx.answerCbQuery(`${e.message}`);
    }
  }
})

export { newSubjectScene };
