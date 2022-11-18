import { Scenes } from 'telegraf';
import { BotContext, sendMessage, editMessageByID, cleanUp } from '../../helpers';
import { BotReplies } from '../bot-replies.constant';
import { SceneIDs } from './scene-ids.enum';
import { NewSubjectKeyboard, CALLBACK_DATA } from '../inline-keyboards';
import { Subject } from '../../services';
import { BotCommands } from '../../constants';

const updateMessage = (ctx: BotContext) => {
  editMessageByID(
    ctx,
    BotReplies.NEW_SUBJECT(ctx.scene.session.subject),
    NewSubjectKeyboard,
  );
};

const messageToBin = (ctx: BotContext, messageID?: number) => {
  const messageToDeleteID = messageID || ctx.message?.message_id;
  if (messageToDeleteID) {
    if (!ctx.session.cleanUpMessages) {
      ctx.session.cleanUpMessages = [];
    }
    ctx.session.cleanUpMessages.push(messageToDeleteID);
  }
};

const newSubjectScene = new Scenes.BaseScene<BotContext>(SceneIDs.NEW_SUBJECT);

newSubjectScene.enter(async (ctx) => {
  const sentMessage =
    await sendMessage(ctx,
      BotReplies.NEW_SUBJECT(ctx.scene.session.subject),
      NewSubjectKeyboard);
  ctx.session.messageID = sentMessage.message_id;
  ctx.session.chatID = sentMessage.chat.id;

  ctx.scene.session.nameInput = false;
  ctx.scene.session.subject = new Subject();
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_CHANGE_NAME, async (ctx) => {
  ctx.scene.session.nameInput = true;
  const sentMessage = await sendMessage(ctx, 'Please, provide a subject name');
  messageToBin(ctx, sentMessage.message_id);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_MAKE_GENERAL, (ctx) => {
  ctx.scene.session.subject.isGeneral = true;
  updateMessage(ctx);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_MAKE_NON_GENERAL, (ctx) => {
  ctx.scene.session.subject.isGeneral = false;
  updateMessage(ctx);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_DISCARD, (ctx) => {
  ctx.scene.leave();
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_UNDO, (ctx) => {
  try {
    const response = ctx.scene.session.subject.undo();
    if (response) {
      updateMessage(ctx);
    }
  } catch (e: any) {
    ctx.answerCbQuery(`${e.message}`);
  }
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_REDO, (ctx) => {
  try {
    const response = ctx.scene.session.subject.redo();
    if (response) {
      updateMessage(ctx);
    }
  } catch (e: any) {
    ctx.answerCbQuery(`${e.message}`);
  }
});


newSubjectScene.hears(BotCommands.NEW_SUBJECT, (ctx) => ctx.scene.reenter());

newSubjectScene.on('text',  (ctx) => {
  const inputingName = ctx.scene.session.nameInput;
  if (inputingName) {
    ctx.scene.session.subject.name = ctx.message.text;
    ctx.scene.session.nameInput = false;
    messageToBin(ctx);
    updateMessage(ctx);
  }
  cleanUp(ctx);
});

export { newSubjectScene };
