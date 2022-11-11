import { Context } from 'telegraf';
import { escapeMessage } from './';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

const sendMessage =
  (ctx: Context, message: string, keyboard?: InlineKeyboardButton[][]) => {
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
