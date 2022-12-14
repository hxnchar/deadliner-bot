/* eslint-disable camelcase */
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { BotContext } from 'bot';
import { escapeMessage } from 'helpers';

const editMessageByID = async (
  ctx: BotContext,
  newText: string,
  keyboard?: InlineKeyboardButton[][],
) => {
  const chatID = ctx.session.chatID,
        messageID = ctx.session.messageID;
  if (keyboard) {
    return ctx.telegram.editMessageText(
      chatID,
      messageID,
      undefined,
      escapeMessage(newText),
      {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: keyboard,
        },
      },
    );
  }
  return ctx.telegram.editMessageText(
    chatID,
    messageID,
    undefined,
    escapeMessage(newText),
    {
      parse_mode: 'MarkdownV2',
    },
  );
};

export { editMessageByID };
