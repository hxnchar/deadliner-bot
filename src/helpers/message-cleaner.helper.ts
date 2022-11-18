import { BotContext } from './bot-context.interface';

const deleteMessage = (ctx: BotContext, messageID: number) => {
  const chatID = ctx.chat?.id;
  if (!chatID) {
    throw Error('This message does not exist');
  }
  return ctx.telegram.deleteMessage(chatID, messageID);
};

const cleanUp = (ctx: BotContext, messages?: number[]) => {
  const messagesToDelete = messages ? messages : ctx.session.cleanUpMessages;
  if (!messagesToDelete) {
    return;
  }

  messagesToDelete.forEach((message) => {
    try {
      deleteMessage(ctx, message);
    } catch (e) {
      console.log(e);
    }
  });

  ctx.session.cleanUpMessages = [];
};

export { deleteMessage, cleanUp };
