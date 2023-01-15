import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { BotReplies, SceneIDs, CALLBACK_DATA, CalendarKeyboard, RemindersKeyboard, ReminderTypeKeyboard, ReminderTypes } from 'consts';
import { BotContext } from 'bot';
import { cleanMessagesBin, messageToBin, sendMessage, editOrSend } from 'helpers';
import { Calendar, CalendarController, Reminder, UserController, User } from 'services';
import { ReminderController } from 'services/reminder/controller';

const { enter } = Scenes.Stage;

const updateTargetMessage = async (ctx: BotContext) => {
  await editOrSend(
    ctx,
    BotReplies().TUNE_REMINDERS(ctx.session.user),
    RemindersKeyboard(),
  );
};

const setReminderType = (ctx: BotContext, reminderTypeStringified: string) => {
  let reminderType: ReminderTypes;
  switch (reminderTypeStringified) {
    case CALLBACK_DATA.BOT:
      reminderType = ReminderTypes.BOT_MESSAGE;
      break;
    case CALLBACK_DATA.CALENDAR:
      reminderType = ReminderTypes.CALENDAR_POPUP;
      break;
    case CALLBACK_DATA.EMAIL:
      reminderType = ReminderTypes.EMAIL;
      break;
    default:
      reminderType = ReminderTypes.BOT_MESSAGE;
      break;
  }
  ctx.session.reminder = new Reminder(reminderType);
};

const remindersSubScene =
  new Scenes.BaseScene<BotContext>(SceneIDs.SETTINGS_REMINDERS);

remindersSubScene.enter(async (ctx) => {
  const sessionOffset = ctx.session.offset;

  if (sessionOffset && ctx.session.reminder) {
    ctx.session.reminder.timeOffset = sessionOffset;

    ctx.session.offset = undefined;
  }

  await updateTargetMessage(ctx);
});

remindersSubScene.action(CALLBACK_DATA.DISCARD, async (ctx) => {
  await ctx.scene.enter(SceneIDs.SETTINGS);
});

remindersSubScene.action(CALLBACK_DATA.SAVE, async (ctx) => {
  if (ctx.session.reminder) {
    const savedReminder =
      await ReminderController.returnSaved(ctx.session.reminder);

    if (savedReminder) {
      ctx.session.user.addReminder(savedReminder);
    }

    ctx.session.reminder = undefined;
  }

  await ctx.scene.enter(SceneIDs.SETTINGS);
});

remindersSubScene.action(CALLBACK_DATA.ADD, async (ctx) => {
  await editOrSend(
    ctx,
    BotReplies().REMINDER_TYPE(),
    ReminderTypeKeyboard(),
  );
});

remindersSubScene.action(CALLBACK_DATA.DISCARD_REMINDER_TYPE, async (ctx) => {
  await updateTargetMessage(ctx);
});

remindersSubScene.on(callbackQuery('data'), async (ctx) => {
  const query = ctx.callbackQuery.data;
  if (query.startsWith(CALLBACK_DATA.REMINDER_TYPE)) {
    const reminderType = query.split(CALLBACK_DATA.SPLIT_SYMBOL).at(-1);
    if (!reminderType) {
      return;
    }
    setReminderType(ctx, reminderType);
    await ctx.scene.enter(SceneIDs.SETTINGS_REMINDER_OFFSET);
  }
});

remindersSubScene.leave(async (ctx) => {
  enter<BotContext>(SceneIDs.SETTINGS);
});

export { remindersSubScene };
