import { Scenes } from 'telegraf';
import { BotReplies, SceneIDs, NewSubjectKeyboard, BotCommands, CALLBACK_DATA } from 'consts';
import { BotContext } from 'bot';
import { Subject, SubjectController, SubjectModel, User, UserController } from 'services';
import { sendMessage, editMessageByID, cleanMessagesBin, messageToBin, deleteMessage } from 'helpers';


const updateMessage = async (ctx: BotContext) => {
  await editMessageByID(
    ctx,
    BotReplies().NEW_SUBJECT(ctx.session.subject),
    NewSubjectKeyboard(),
  );
};

const resetFlags = (ctx: BotContext) => {
  ctx.scene.session.subjectNameInput = false;
};

const newSubjectScene = new Scenes.BaseScene<BotContext>(SceneIDs.NEW_SUBJECT);

newSubjectScene.enter(async (ctx) => {
  resetFlags(ctx);

  const sentMessage =
    await sendMessage(ctx,
      BotReplies().NEW_SUBJECT(ctx.session.subject),
      NewSubjectKeyboard());

  ctx.session.subject =
    ctx.session.subject === undefined ? new Subject() : ctx.session.subject;

  ctx.session.messageID = sentMessage.message_id;
  ctx.session.chatID = sentMessage.chat.id;
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_CHANGE_NAME, async (ctx) => {
  resetFlags(ctx);
  ctx.scene.session.subjectNameInput = true;
  const sentMessage = await sendMessage(ctx, 'Please, provide a subject name');
  messageToBin(ctx, sentMessage.message_id);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_MAKE_GENERAL, async (ctx) => {
  ctx.session.subject.isGeneral = true;
  await updateMessage(ctx);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_MAKE_NON_GENERAL, async (ctx) => {
  ctx.session.subject.isGeneral = false;
  await updateMessage(ctx);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_DISCARD, async (ctx) => {
  await ctx.scene.leave();
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_UNDO, async (ctx) => {
  ctx.session.subject.undo();
  await updateMessage(ctx);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_RESET, async (ctx) => {
  resetFlags(ctx);
  ctx.session.subject = new Subject();
  await updateMessage(ctx);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_REDO, async (ctx) => {
  ctx.session.subject.redo();
  await updateMessage(ctx);
});

newSubjectScene.action(CALLBACK_DATA.SUBJECT_SAVE, async (ctx) => {
  const targetSubject = ctx.session.subject;

  await SubjectController.save(targetSubject);
  await ctx.answerCbQuery('Subject was saved successfully');

  if (targetSubject.isGeneral) {
    const users = await UserController.getAll();

    for (const user of users) {
      await User.subscribeUserTo(user, targetSubject);
    }

    await ctx.answerCbQuery('Subject was added to each user');
  }
  ctx.session.subject = new Subject();
  await ctx.scene.leave();
});

newSubjectScene.hears(BotCommands.NEW_SUBJECT,
  async (ctx) => ctx.scene.reenter());

newSubjectScene.on('text', async (ctx) => {
  const inputingName = ctx.scene.session.subjectNameInput;
  if (inputingName) {
    ctx.session.subject.name = ctx.message.text;
    ctx.scene.session.subjectNameInput = false;
    messageToBin(ctx);
    await updateMessage(ctx);
  }
  await cleanMessagesBin(ctx);
});

newSubjectScene.leave(async (ctx) => {
  if (ctx.session.messageID) {
    await deleteMessage(ctx, ctx.session.messageID);
  }
});

export { newSubjectScene };
