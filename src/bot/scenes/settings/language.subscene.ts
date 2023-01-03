import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { BotReplies, SceneIDs, CALLBACK_DATA, LanguageKeyboard, Language } from 'consts';
import { BotContext } from 'bot';
import { editOrSend } from 'helpers';

const { enter } = Scenes.Stage;

const updateTargetMessage = async (ctx: BotContext) => {
  await editOrSend(
    ctx,
    BotReplies().PEEK_LANGUAGE(),
    LanguageKeyboard(),
  );
};

const setLanguage = (ctx: BotContext, language: string) => {
  let userLanguage: Language = Language.en;
  switch (language) {
    case 'ua':
      userLanguage = Language.ua;
      break;
    case 'en':
      userLanguage = Language.en;
      break;
    default:
      userLanguage = Language.en;
      break;
  }
  ctx.session.user.language = userLanguage;
};

const languageSubScene =
  new Scenes.BaseScene<BotContext>(SceneIDs.EDIT_LANGUAGE);

languageSubScene.enter(async (ctx) => {
  // console.log('entering lang');
  // console.log(ctx.scene.current);
  // console.log('\n\n\n====\n\n\n');
  await updateTargetMessage(ctx);
});

languageSubScene.action(CALLBACK_DATA.LANGUAGE_DISCARD, async (ctx) => {
  await ctx.scene.leave();
});

languageSubScene.on(callbackQuery('data'), async (ctx) => {
  const query = ctx.callbackQuery.data;
  if (query.startsWith(CALLBACK_DATA.SETTINGS_SET_LANGUAGE)) {
    const language = query.split(CALLBACK_DATA.SPLIT_SYMBOL).at(-1);
    if (!language) {
      return;
    }
    setLanguage(ctx, language);
    await ctx.scene.leave();
  }
});

languageSubScene.leave(async (ctx) => {
  enter<BotContext>(SceneIDs.SETTINGS);
});

export { languageSubScene };
