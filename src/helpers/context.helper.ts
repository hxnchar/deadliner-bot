import { BotContext } from 'bot';
import { Language } from 'consts/enums';

const getLanguage = (ctx: BotContext) =>
  ctx.session.user?.language || Language.en;

export { getLanguage };
