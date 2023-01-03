import { Scenes } from 'telegraf';
import { BotReplies, SceneIDs, CALLBACK_DATA, BotCommands, SettingsKeyboard } from 'consts';
import { BotContext } from 'bot';
import { UserController } from 'services';
import { editOrSend, deleteTargetMessage } from 'helpers';

const settingsMainScene = new Scenes.BaseScene<BotContext>(SceneIDs.SETTINGS);

settingsMainScene.enter(async (ctx) => {
  // console.log(ctx.message);
  // console.log('enter settings');
  // console.log(ctx.scene.current);
  // console.log('\n\n\n====\n\n\n');
  console.log(SettingsKeyboard());
  await editOrSend(ctx,
    BotReplies().SETTINGS(ctx.session.user),
    SettingsKeyboard());
});

settingsMainScene.hears(BotCommands.SETTINGS,
  async (ctx) => ctx.scene.reenter());

settingsMainScene.action(CALLBACK_DATA.SETTINGS_SUBJECTS, async (ctx) => {
  ctx.scene.enter(SceneIDs.EDIT_PERSONAL_SUBJECTS);
});

settingsMainScene.action(CALLBACK_DATA.SETTINGS_LANGUAGE, async (ctx) => {
  // console.log('before leave settings');
  // console.log(ctx.scene.current);
  // console.log('\n\n\n====\n\n\n');
  console.log('entering the language scene');
  await ctx.scene.enter(SceneIDs.EDIT_LANGUAGE);
});

settingsMainScene.action(CALLBACK_DATA.SETTINGS_CALENDAR, async (ctx) => {
  await ctx.scene.enter(SceneIDs.EDIT_CALENDAR);
});

settingsMainScene.action(CALLBACK_DATA.SETTINGS_DISCARD, async (ctx) => {
  await deleteTargetMessage(ctx);
  await ctx.scene.leave();
});

settingsMainScene.action(CALLBACK_DATA.SETTINGS_SAVE, async (ctx) => {
  await UserController.save(ctx.session.user);
  await ctx.answerCbQuery('Settings updated successfully');
  await deleteTargetMessage(ctx);
  await ctx.scene.leave();
});

export { settingsMainScene };
