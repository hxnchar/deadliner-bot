import { Scenes } from 'telegraf';
import { BotReplies, SceneIDs, CALLBACK_DATA, CalendarKeyboard } from 'consts';
import { BotContext } from 'bot';
import { cleanMessagesBin, messageToBin, sendMessage, editOrSend } from 'helpers';
import { Calendar, CalendarController } from 'services';

const { enter } = Scenes.Stage;

const updateTargetMessage = async (ctx: BotContext) => {
  await editOrSend(
    ctx,
    BotReplies().TUNE_CALENDAR(ctx.session.user.calendar),
    CalendarKeyboard(),
  );
};

const calendarSubScene =
  new Scenes.BaseScene<BotContext>(SceneIDs.EDIT_CALENDAR);

calendarSubScene.enter(async (ctx) => {
  await updateTargetMessage(ctx);
});

calendarSubScene.action(CALLBACK_DATA.SETTINGS_SET_CALENDAR_ID, async (ctx) => {
  ctx.scene.session.calendarIDinput = true;
  const sentMessage = await sendMessage(ctx, 'Please, provide yout calendar ID');
  messageToBin(ctx, sentMessage.message_id);
});

calendarSubScene.action(CALLBACK_DATA.SETTINGS_CALENDAR_SAVE, async (ctx) => {
  if (ctx.session.calendar) {
    const calendar = ctx.session.calendar;
    const calendarModel = await CalendarController.save(calendar);
    if (calendarModel) {
      ctx.session.user.calendar = Calendar.parse(calendarModel);
    }
    ctx.session.calendar = undefined;
  }
  await ctx.scene.enter(SceneIDs.SETTINGS);
});

calendarSubScene.on('text', async (ctx) => {
  messageToBin(ctx);

  if (ctx.scene.session.calendarIDinput) {
    ctx.scene.session.calendarIDinput = false;
    const calendarID = ctx.message.text;
    if (ctx.session.calendar) {
      ctx.session.calendar.calendarID = calendarID;
    } else {
      ctx.session.user.calendar = new Calendar(calendarID);
    }
    await updateTargetMessage(ctx);
  }
  await cleanMessagesBin(ctx);
});

calendarSubScene.leave(async (ctx) => {
  enter<BotContext>(SceneIDs.SETTINGS);
});

export { calendarSubScene };
