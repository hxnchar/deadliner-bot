import { BotContext } from 'bot';
import { sendMessage } from 'helpers/message-sender.helper';

async function errorMiddleware(err: any, ctx: BotContext) {
  const errorMessage = `Error occurred: ${err.message}`;
  try {
    await ctx.answerCbQuery(errorMessage);
  } catch {
    await sendMessage(ctx, errorMessage);
  }
}

export { errorMiddleware };
