import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { BotReplies, SceneIDs, CALLBACK_DATA, CalendarKeyboard, Language } from 'consts';
import { BotContext } from 'bot';
import { editMessageByID, cleanMessagesBin, messageToBin, sendMessage, editOrSend } from 'helpers';
import { Calendar, CalendarModel } from 'services';

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
  if (ctx.session.user.calendar) {
    const calendarModel =
      new CalendarModel(ctx.session.user.calendar.convertToObject());
    await calendarModel.save();
    ctx.session.user.calendar = Calendar.parse(calendarModel);
  }
  await updateTargetMessage(ctx);
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
    await updateTargetMessage(ctx);
  }

  await cleanMessagesBin(ctx);
});

calendarSubScene.leave(async (ctx) => {
  ctx.scene.enter(SceneIDs.SETTINGS);
});

export { calendarSubScene };
