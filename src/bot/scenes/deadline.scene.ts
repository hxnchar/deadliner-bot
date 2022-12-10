import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { parse } from 'date-fns';
import { BotReplies, SceneIDs, NewDeadlineKeyboard, BotCommands, CALLBACK_DATA, DateTimeCommonFormat, PeekSubject } from 'consts';
import { BotContext } from 'bot';
import { Deadline, DeadlineController, SubjectController } from 'services';
import { sendMessage, editMessageByID, cleanMessagesBin, messageToBin, deleteMessage } from 'helpers';

const updateDeadlineMessage = async (ctx: BotContext) => {
  await editMessageByID(
    ctx,
    BotReplies.DEADLINE(ctx.session.deadline),
    NewDeadlineKeyboard,
  );
};

const updatePeekSubjectMessage = async (ctx: BotContext) => {
  await editMessageByID(
    ctx,
    BotReplies.PEEK_PERSONAL,
    await PeekSubject(),
  );
};

const resetFlags = (ctx: BotContext) => {
  ctx.scene.session.deadlineTaskInput = false;
  ctx.scene.session.deadlineDateInput = false;
};

const deadlineScene = new Scenes.BaseScene<BotContext>(SceneIDs.NEW_DEADLINE);

deadlineScene.enter(async (ctx) => {
  resetFlags(ctx);

  const sentMessage =
    await sendMessage(ctx,
      BotReplies.DEADLINE(ctx.session.deadline),
      NewDeadlineKeyboard);

  ctx.session.deadline =
    ctx.session.deadline === undefined ? new Deadline() : ctx.session.deadline;

  ctx.session.messageID = sentMessage.message_id;
  ctx.session.chatID = sentMessage.chat.id;
});

deadlineScene.action(CALLBACK_DATA.DEADLINE_CHANGE_TASK, async (ctx) => {
  resetFlags(ctx);
  ctx.scene.session.deadlineTaskInput = true;
  const sentMessage = await sendMessage(ctx, 'Please, provide a task');
  messageToBin(ctx, sentMessage.message_id);
});

deadlineScene.action(CALLBACK_DATA.DEADLINE_CHANGE_DATE, async (ctx) => {
  resetFlags(ctx);
  ctx.scene.session.deadlineDateInput = true;
  const sentMessage = await sendMessage(ctx, `Please, provide a deadline date and time in a following way _${DateTimeCommonFormat}_`);
  messageToBin(ctx, sentMessage.message_id);
});

deadlineScene.action(CALLBACK_DATA.DEADLINE_SET_SUBJECT, async (ctx) => {
  resetFlags(ctx);
  await updatePeekSubjectMessage(ctx);
});

deadlineScene.action(CALLBACK_DATA.DEADLINE_DISCARD, (ctx) => {
  ctx.scene.leave();
});

deadlineScene.action(CALLBACK_DATA.DEADLINE_SAVE, async (ctx) => {
  try {
    const targetDeadline = ctx.session.deadline;

    await DeadlineController.save(targetDeadline);
    ctx.answerCbQuery('Deadline was saved successfully');

    ctx.session.deadline = new Deadline();
    ctx.scene.leave();
  } catch (e: any) {
    ctx.answerCbQuery(`${e.message}`);
  }
});


deadlineScene.action(
  CALLBACK_DATA.REMOVE_SUBJECT,
  async (ctx) => {
    ctx.session.deadline.subject = undefined;
    await updateDeadlineMessage(ctx);
  },
);

deadlineScene.hears(BotCommands.NEW_DEADLINE, (ctx) => ctx.scene.reenter());

deadlineScene.on('text',  (ctx) => {
  const inputingTask = ctx.scene.session.deadlineTaskInput,
        inputingDate = ctx.scene.session.deadlineDateInput;
  if (inputingTask) {
    ctx.session.deadline.task = ctx.message.text;
    ctx.scene.session.deadlineTaskInput = false;
    messageToBin(ctx);
    updateDeadlineMessage(ctx);
  }
  if (inputingDate) {
    ctx.session.deadline.date =
      parse(ctx.message.text, DateTimeCommonFormat, new Date());
    ctx.scene.session.deadlineDateInput = false;
    messageToBin(ctx);
    updateDeadlineMessage(ctx);
  }
  cleanMessagesBin(ctx);
});

deadlineScene.on(callbackQuery('data'), async (ctx) => {
  const query = ctx.callbackQuery.data;
  if (query.startsWith(CALLBACK_DATA.LINK_SUBJECT)) {
    const subjectID = query.split(CALLBACK_DATA.SPLIT_SYMBOL).at(-1);
    if (subjectID) {
      const subject = await SubjectController.getByID(subjectID);
      ctx.session.deadline.subject = subject;
    }
  }
  await updateDeadlineMessage(ctx);
});

deadlineScene.leave(async (ctx) => {
  if (ctx.session.messageID) {
    try {
      deleteMessage(ctx, ctx.session.messageID);
    } catch (e: any) {
      ctx.answerCbQuery(`${e.message}`);
    }
  }
});

export { deadlineScene };
