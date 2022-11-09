import { Context } from 'telegraf';
import { sendMessage } from '../helpers';
import { BotReplies } from '../constants';

class BotService {

  start(ctx: Context) {
    return sendMessage(ctx, BotReplies.START);
  }

}

export { BotService };
