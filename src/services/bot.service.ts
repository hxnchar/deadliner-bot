import { Telegraf } from 'telegraf';
import { BotContext } from 'bot';
import { sendMessage } from 'helpers';
import { BotReplies, commandsList } from 'consts';
import { Database } from 'database';
import { DB_CONFIG } from 'configs';
import { UserController } from './user';

class BotService {
  database;
  target;

  constructor(bot: Telegraf<BotContext>) {
    this.database = new Database(DB_CONFIG.uri);
    this.target = bot;
  }

  async setup() {
    await this.database.connect();
    await this.target.telegram.setMyCommands(commandsList);
  }

  async start(ctx: BotContext) {
    const userID = ctx.from?.id,
          username = ctx.from?.username;
    const userExists = await UserController.exists(ctx.from?.id);
    if (!userExists) {
      const newUser = await UserController.create(userID, username);
      await UserController.save(newUser);
    }
    return sendMessage(ctx, BotReplies.START);
  }

  help(ctx: BotContext) {
    return sendMessage(ctx, BotReplies.HELP);
  }

  // todolist(ctx: BotContext) {
  //   const tasks = await DeadlineController.
  // }

}

export { BotService };
