import { Scenes } from 'telegraf';
import { BotReplies, SceneIDs, CALLBACK_DATA, CalendarKeyboard } from 'consts';
import { BotContext } from 'bot';
import { cleanMessagesBin, messageToBin, sendMessage, editOrSend } from 'helpers';
import { Calendar, CalendarController, UserController } from 'services';

const { enter } = Scenes.Stage;

const updateTargetMessage = async (ctx: BotContext) => {
  await editOrSend(
    ctx,
    BotReplies().TUNE_CALENDAR(ctx.session.user.calendar),
    CalendarKeyboard(),
  );
};

const calendarSubScene =
  new Scenes.BaseScene<BotContext>(SceneIDs.SETTINGS_CALENDAR);

calendarSubScene.enter(async (ctx) => {
  await updateTargetMessage(ctx);
});

calendarSubScene.action(CALLBACK_DATA.SETTINGS_SET_CALENDAR_ID, async (ctx) => {
  ctx.scene.session.calendarIDinput = true;
  const sentMessage = await sendMessage(ctx, 'Please, provide your calendar ID');
  messageToBin(ctx, sentMessage.message_id);
});

calendarSubScene.action(CALLBACK_DATA.DELETE, async (ctx) => {
  ctx.session.user.calendar = undefined;
  await ctx.scene.enter(SceneIDs.SETTINGS);
});

calendarSubScene.action(CALLBACK_DATA.DISCARD, async (ctx) => {
  await ctx.scene.enter(SceneIDs.SETTINGS);
});

calendarSubScene.action(CALLBACK_DATA.SAVE, async (ctx) => {
  const userCalendar = ctx.session.user.calendar;

  if (userCalendar) {
    const calendar = await CalendarController.returnSaved(userCalendar);

    if (calendar) {
      ctx.session.user.calendar = calendar;
      await UserController.save(ctx.session.user);
    }
  }
  await ctx.scene.enter(SceneIDs.SETTINGS);
});

calendarSubScene.on('text', async (ctx) => {
  messageToBin(ctx);

  if (ctx.scene.session.calendarIDinput) {
    const calendarID = ctx.message.text;

    if (ctx.session.user.calendar) {
      ctx.session.user.calendar.calendarID = calendarID;
    } else {
      ctx.session.user.calendar = new Calendar(calendarID);
    }

    ctx.scene.session.calendarIDinput = false;
    await updateTargetMessage(ctx);
  }
  await cleanMessagesBin(ctx);
});

calendarSubScene.leave(async (ctx) => {
  enter<BotContext>(SceneIDs.SETTINGS);
});

export { calendarSubScene };
