import { BotContext, sendMessage } from '../helpers';
import { BotReplies, NewSubjectKeyboard } from '../constants';

class BotService {
  start(ctx: BotContext) {
    return sendMessage(ctx, BotReplies.START);
  }

  help(ctx: BotContext) {
    return sendMessage(ctx, BotReplies.HELP);
  }
}

export { BotService };
