import { BotContext } from 'bot/index.js';

async function errorMiddleware(err: any, ctx: BotContext) {
  await ctx.answerCbQuery(`Error occurred: ${err.message}`);
}

export { errorMiddleware };
