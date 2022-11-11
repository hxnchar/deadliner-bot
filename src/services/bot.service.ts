import { Context } from 'telegraf';
import { sendMessage } from '../helpers';
import { BotReplies, NewSubjectKeyboard } from '../constants';

class BotService {

  start(ctx: Context) {
    return sendMessage(ctx, BotReplies.START);
  }

  help(ctx: Context) {
    return sendMessage(ctx, BotReplies.HELP);
  }

  newSubject(ctx: Context) {
    return sendMessage(ctx, BotReplies.NEW_SUBJECT, NewSubjectKeyboard);
  }
}

export { BotService };
