import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { BotContext } from 'bot';
import { escapeMessage } from 'helpers';

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
