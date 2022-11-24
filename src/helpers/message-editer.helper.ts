import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { BotContext } from 'bot/enviroment';
import { escapeMessage } from './message-escaper.helper';

const editMessageByID = (
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
        'parse_mode': 'MarkdownV2',
        'reply_markup': {
          'inline_keyboard': keyboard,
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
      'parse_mode': 'MarkdownV2',
    },
  );
};

export { editMessageByID };
