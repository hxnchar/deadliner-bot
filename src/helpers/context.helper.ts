import { BotContext } from 'bot';
import { Language } from 'consts/enums';

const getLanguage = (ctx: BotContext) =>
  ctx.session.user?.language || Language.en;

const resetTargetMessage = (ctx: BotContext) => {
  ctx.session.messageID = undefined;
  ctx.session.chatID = undefined;
};

export { getLanguage, resetTargetMessage };
