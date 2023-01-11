import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { BotReplies, SceneIDs, CALLBACK_DATA, CalendarKeyboard, OffsetKeyboard, ReminderTypeKeyboard, ReminderTypes, LangData } from 'consts';
import { BotContext } from 'bot';
import { cleanMessagesBin, messageToBin, sendMessage, editOrSend } from 'helpers';
import { BotService, Calendar, CalendarController, Reminder } from 'services';
import { Offset } from 'services/offset';

const { enter } = Scenes.Stage;

const updateTargetMessage = async (ctx: BotContext) => {
  await editOrSend(
    ctx,
    BotReplies().SET_OFFSET(ctx.session.offset),
    OffsetKeyboard(),
  );
};

const changeWithoutData = async (ctx: BotContext, query: string) => {
  const itemToChange =
      query.split(CALLBACK_DATA.SPLIT_SYMBOL).at(-1)?.toLowerCase();

  if (!itemToChange || !ctx.session.offset) {
    return;
  }

  const oldValue = ctx.session.offset.getValue(itemToChange);
  const data = query.startsWith(CALLBACK_DATA.INCREASE) ? 1 : -1;
  ctx.session.offset.setValue(itemToChange, oldValue + data);
  await updateTargetMessage(ctx);
};

const changeWithData = async (ctx: BotContext, query: string) => {
  const LANG = BotService.language;

  const itemToChange = query.toLowerCase();

  if (!itemToChange) {
    return;
  }

  const sentMessage = await sendMessage(ctx, `${LangData[LANG]['please-provide-info-about']} ${LangData[LANG][itemToChange]}`);
  messageToBin(ctx, sentMessage.message_id);

  if (ctx.session.offset) {
    ctx.session.offset.target[
      itemToChange as keyof typeof ctx.session.offset.target].inputting = true;
  }
};

const offsetSubScene =
  new Scenes.BaseScene<BotContext>(SceneIDs.SETTINGS_REMINDER_OFFSET);

offsetSubScene.enter(async (ctx) => {
  ctx.session.offset = new Offset();
  await updateTargetMessage(ctx);
});

offsetSubScene.action(CALLBACK_DATA.SAVE, async (ctx) => {
  if (ctx.session.offset && ctx.session.offset.notNull()) {
    await ctx.scene.enter(SceneIDs.SETTINGS_REMINDERS);
  }

  ctx.answerCbQuery('Offset cannot be 0');
});

offsetSubScene.on(callbackQuery('data'), async (ctx) => {
  const query = ctx.callbackQuery.data;

  if (query.startsWith(CALLBACK_DATA.INCREASE) ||
  query.startsWith(CALLBACK_DATA.DECREASE)) {

    await changeWithoutData(ctx, query);
    return;

  }

  changeWithData(ctx, query);
});

offsetSubScene.on('text', async (ctx) => {
  messageToBin(ctx);

  if (!ctx.session.offset) {
    return;
  }

  const inputingData = ctx.session.offset.targetToArray()
    .filter((elem) => elem.value.inputting === true)[0];
  const inputtingKey = inputingData.key;

  if (inputtingKey) {
    const dataToSet = Number(ctx.message.text);
    ctx.session.offset.setValue(inputtingKey, dataToSet);
    ctx.session.offset.resetFlag(inputtingKey);
  }

  await updateTargetMessage(ctx);
  await cleanMessagesBin(ctx);
});

offsetSubScene.leave(async (ctx) => {
  enter<BotContext>(SceneIDs.REMINDER);
});

export { offsetSubScene };
