import { Telegraf } from 'telegraf';
import { BotContext } from 'bot';
import { sendMessage } from 'helpers';
import { BotReplies, commandsList } from 'consts';
import { Database } from 'database';
import { DB_CONFIG } from 'configs';

class BotService {
  database;
  target;
  
  constructor(bot: Telegraf<BotContext>) {
    this.database = new Database(DB_CONFIG.uri);
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
