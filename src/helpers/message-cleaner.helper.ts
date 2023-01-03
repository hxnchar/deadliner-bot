import { BotContext } from 'bot';
import { resetTargetMessage } from 'helpers/context.helper';

const messageToBin = (ctx: BotContext, messageID?: number) => {
  const messageToDeleteID = messageID || ctx.message?.message_id;
  if (messageToDeleteID) {
    if (!ctx.session.cleanUpMessages) {
      ctx.session.cleanUpMessages = [];
    }
    ctx.session.cleanUpMessages.push(messageToDeleteID);
  }
};

const deleteMessage =
  async (ctx: BotContext, messageID: number | undefined) => {
    const chatID = ctx.chat?.id;
    if (!chatID || !messageID) {
      throw Error('This message does not exist');
    }
    return ctx.telegram.deleteMessage(chatID, messageID);
  };

const deleteTargetMessage =
  async (ctx: BotContext) => {
    const messageID = ctx.session.messageID,
          chatID = ctx.session.chatID;
    if (chatID && messageID) {
      await ctx.telegram.deleteMessage(chatID, messageID);
    }
    resetTargetMessage(ctx);
  };

const cleanMessagesBin = async (ctx: BotContext, messages?: number[]) => {
  const messagesToDelete = messages ? messages : ctx.session.cleanUpMessages;
  if (!messagesToDelete) {
    return;
  }

  messagesToDelete.forEach(async (message) => {
    try {
      await deleteMessage(ctx, message);
    } catch (e: any) {
      console.log(e);
    }
  });

  ctx.session.cleanUpMessages = [];
};

export { messageToBin, deleteMessage, cleanMessagesBin, deleteTargetMessage };
