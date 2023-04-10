/* eslint-disable camelcase */
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { BotContext } from 'bot';
import { escapeMessage } from 'helpers';

const sendMessageToChat = (ctx: BotContext, chatID: number, data: string) =>
  ctx.telegram.sendMessage(chatID, data);

const sendMessage = (
  ctx: BotContext,
  message: string,
  keyboard?: InlineKeyboardButton[][],
) => {
  if (keyboard) {
    return ctx.replyWithMarkdownV2(escapeMessage(message), {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  }
  return ctx.replyWithMarkdownV2(escapeMessage(message));
};

export { sendMessage, sendMessageToChat };
