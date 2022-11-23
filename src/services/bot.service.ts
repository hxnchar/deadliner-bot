import { BotContext, sendMessage } from '../helpers';
import { BotReplies, commandsList } from '../constants';
import { Database } from '../database';
import { Telegraf } from 'telegraf';

class BotService {
  database;
  target;
  constructor(bot: Telegraf<BotContext>) {
    const uri = process.env.DB_URI!;
    this.database = new Database(uri);
    this.target = bot;
  }

  async setup() {
    await this.database.connect();
    this.target.telegram.setMyCommands(commandsList);
  }

  start(ctx: BotContext) {
    return sendMessage(ctx, BotReplies.START);
  }

  help(ctx: BotContext) {
    return sendMessage(ctx, BotReplies.HELP);
  }
}

export { BotService };
