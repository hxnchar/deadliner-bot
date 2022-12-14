import { BotContext } from 'bot';
import { BotService, UserController } from 'services';

async function languageMiddleware(ctx: BotContext, next: any) {
  const userID = ctx.from?.id;
  if (!ctx.session.user) {
    ctx.session.user = await UserController.getByID(userID);
  }

  BotService.language = ctx.session.user.language;
  next();
}

export { languageMiddleware };
