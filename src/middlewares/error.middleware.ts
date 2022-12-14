import { BotContext } from 'bot';
import { sendMessage } from 'helpers/message-sender.helper';

async function errorMiddleware(err: any, ctx: BotContext) {
  await sendMessage(ctx, `Error occurred: ${err.message}`);
}

export { errorMiddleware };
