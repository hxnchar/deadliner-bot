import { Scenes } from 'telegraf';
import { BotReplies, SceneIDs, CALLBACK_DATA, BotCommands, SettingsKeyboard } from 'consts';
import { BotContext } from 'bot';
import { UserController } from 'services';
import { sendMessage, deleteMessage, editOrSend, resetTargetMessage } from 'helpers';

const resetSession = async (ctx: BotContext) => {
  await deleteMessage(ctx, ctx.session.messageID);
  resetTargetMessage(ctx);
};

const settingsScene = new Scenes.BaseScene<BotContext>(SceneIDs.SETTINGS);

settingsScene.enter(async (ctx) => {
  await editOrSend(ctx,
    BotReplies().SETTINGS(ctx.session.user),
    SettingsKeyboard());
});

settingsScene.hears(BotCommands.SETTINGS, async (ctx) => ctx.scene.reenter());

settingsScene.action(CALLBACK_DATA.SETTINGS_SUBJECTS, async (ctx) => {
  ctx.scene.enter(SceneIDs.EDIT_PERSONAL_SUBJECTS);
});

settingsScene.action(CALLBACK_DATA.SETTINGS_LANGUAGE, async (ctx) => {
  ctx.scene.enter(SceneIDs.EDIT_LANGUAGE);
});

settingsScene.action(CALLBACK_DATA.SETTINGS_CALENDAR, async (ctx) => {
  ctx.scene.enter(SceneIDs.EDIT_CALENDAR);
});

settingsScene.action(CALLBACK_DATA.SETTINGS_DISCARD, async (ctx) => {
  await resetSession(ctx);
  await ctx.scene.leave();
});

settingsScene.action(CALLBACK_DATA.SETTINGS_SAVE, async (ctx) => {
  await UserController.save(ctx.session.user);
  await ctx.answerCbQuery('Settings updated successfully');
  await resetSession(ctx);
  await ctx.scene.leave();
});

export { settingsScene };
