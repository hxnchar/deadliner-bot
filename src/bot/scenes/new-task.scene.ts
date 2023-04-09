import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { parse } from 'date-fns';
import { BotReplies, SceneIDs, NewTaskKeyboard, BotCommands, CALLBACK_DATA, DateTimeCommonFormat, PeekSubject } from 'consts';
import { BotContext } from 'bot';
import { Task, TaskController, SubjectController, UserController } from 'services';
import { sendMessage, editMessageByID, cleanMessagesBin, messageToBin, deleteMessage } from 'helpers';

const updateTaskMessage = async (ctx: BotContext) => {
  await editMessageByID(
    ctx,
    BotReplies().NEW_TASK(ctx.session.task),
    NewTaskKeyboard(),
  );
};

const updatePeekSubjectMessage = async (ctx: BotContext) => {
  await editMessageByID(
    ctx,
    BotReplies().PEEK_PERSONAL(),
    await PeekSubject(),
  );
};

const resetFlags = (ctx: BotContext) => {
  ctx.scene.session.taskBodyInput = false;
  ctx.scene.session.taskDateInput = false;
};

const newTaskScene = new Scenes.BaseScene<BotContext>(SceneIDs.NEW_TASK);

newTaskScene.enter(async (ctx) => {
  resetFlags(ctx);

  const sentMessage =
    await sendMessage(ctx,
      BotReplies().NEW_TASK(ctx.session.task),
      NewTaskKeyboard());

  ctx.session.task =
    ctx.session.task === undefined ? new Task() : ctx.session.task;

  ctx.session.messageID = sentMessage.message_id;
  ctx.session.chatID = sentMessage.chat.id;
});

newTaskScene.action(CALLBACK_DATA.DEADLINE_CHANGE_TASK, async (ctx) => {
  resetFlags(ctx);
  ctx.scene.session.taskBodyInput = true;
  const sentMessage = await sendMessage(ctx, 'Please, provide body');
  messageToBin(ctx, sentMessage.message_id);
});

newTaskScene.action(CALLBACK_DATA.DEADLINE_CHANGE_DATE, async (ctx) => {
  resetFlags(ctx);
  ctx.scene.session.taskDateInput = true;
  const sentMessage = await sendMessage(ctx, `Please, provide a deadline date and time in a following way _${DateTimeCommonFormat}_`);
  messageToBin(ctx, sentMessage.message_id);
});

newTaskScene.action(CALLBACK_DATA.DEADLINE_SET_SUBJECT, async (ctx) => {
  resetFlags(ctx);
  await updatePeekSubjectMessage(ctx);
});

newTaskScene.action(CALLBACK_DATA.DISCARD, async (ctx) => {
  await ctx.scene.leave();
});

newTaskScene.action(CALLBACK_DATA.SAVE, async (ctx) => {
  const targetTask = ctx.session.task;

  await TaskController.save(targetTask);
  await ctx.answerCbQuery('Task was saved successfully');

  ctx.session.task = new Task();
  await ctx.scene.leave();
});


newTaskScene.action(
  CALLBACK_DATA.REMOVE_SUBJECT,
  async (ctx) => {
    ctx.session.task.subject = undefined;
    await updateTaskMessage(ctx);
  },
);

newTaskScene.hears(BotCommands.NEW_TASK, async (ctx) => ctx.scene.reenter());

newTaskScene.on('text', async (ctx) => {
  const inputtingBody = ctx.scene.session.taskBodyInput,
        inputtingDate = ctx.scene.session.taskDateInput;
  if (inputtingBody) {
    ctx.session.task.body = ctx.message.text;
    ctx.scene.session.taskBodyInput = false;
    messageToBin(ctx);
    await updateTaskMessage(ctx);
  }
  if (inputtingDate) {
    ctx.session.task.deadline =
      parse(ctx.message.text, DateTimeCommonFormat, new Date());
    ctx.scene.session.taskDateInput = false;
    messageToBin(ctx);
    await updateTaskMessage(ctx);
  }
  await cleanMessagesBin(ctx);
});

newTaskScene.on(callbackQuery('data'), async (ctx) => {
  const query = ctx.callbackQuery.data;
  if (query.startsWith(CALLBACK_DATA.LINK_SUBJECT)) {
    const subjectID = query.split(CALLBACK_DATA.SPLIT_SYMBOL).at(-1);
    if (subjectID) {
      const subject = await SubjectController.getByID(subjectID);
      ctx.session.task.subject = subject;
    }
  }
  await updateTaskMessage(ctx);
});

newTaskScene.leave(async (ctx) => {
  if (ctx.session.messageID) {
    await deleteMessage(ctx, ctx.session.messageID);
  }
});

export { newTaskScene };
