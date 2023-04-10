import { BotContext } from 'bot';
import { BotService, UserController } from 'services';

async function languageMiddleware(ctx: BotContext, next: any) {
  const userID = ctx.from?.id,
        username = ctx.from?.username,
        chatID = ctx.chat?.id;

  if (!ctx.session.user) {
    ctx.session.user = await UserController.getByID(userID, chatID, username);
  }

  BotService.language = ctx.session.user.language;
  next();
}

export { languageMiddleware };
