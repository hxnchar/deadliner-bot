import { BotContext } from './bot-context.interface';
import { escapeMessage } from './message-escaper.helper';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

const sendMessage = (
  ctx: BotContext,
  message: string,
  keyboard?: InlineKeyboardButton[][],
) => {
  if (keyboard) {
    return ctx.replyWithMarkdownV2(escapeMessage(message), {
      'reply_markup': {
        'inline_keyboard': keyboard,
      },
    });
  }
  return ctx.replyWithMarkdownV2(escapeMessage(message));
};

export { sendMessage };
