import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { BotContext } from 'bot';
import { editMessageByID } from 'helpers/message-editer.helper';
import { sendMessage } from 'helpers/message-sender.helper';
import { message } from 'telegraf/filters';

const editOrSend =
  async (ctx: BotContext, data: string, keyboard: InlineKeyboardButton[][]) => {
    try {
      await editMessageByID(
        ctx,
        data,
        keyboard,
      );
    } catch {
      const message = await sendMessage(
        ctx,
        data,
        keyboard,
      );
      ctx.session.messageID = message.message_id;
      ctx.session.chatID = message.chat.id;
    }
  };

export { editOrSend };
