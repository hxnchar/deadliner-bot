import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { BotContext } from 'bot';
import { editMessageByID } from 'helpers/message-editer.helper';
import { sendMessage } from 'helpers/message-sender.helper';

const editOrSend =
  async (ctx: BotContext, data: string, keyboard: InlineKeyboardButton[][]) => {
    const messageID = ctx.session.messageID,
          chatID = ctx.session.chatID;

    const messageExists = chatID && messageID;

    if (messageExists) {
      return editMessageByID(
        ctx,
        data,
        keyboard,
      );
    }

    const sentMessage = await sendMessage(
      ctx,
      data,
      keyboard,
    );
    ctx.session.messageID = sentMessage.message_id;
    ctx.session.chatID = sentMessage.chat.id;

    return sentMessage;
  };

export { editOrSend };
