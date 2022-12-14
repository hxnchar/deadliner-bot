import { BotContext } from 'bot';
import { Language } from 'consts/enums';
import { BotService, User, UserController } from 'services';

async function languageMiddleware(ctx: BotContext, next: any) {
  const userID = ctx.from?.id;
  const user: User = ctx.session.user ?? await UserController.getByID(userID);
  BotService.language = user.language;
  next();
}

export { languageMiddleware };
