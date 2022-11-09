import { Context } from 'telegraf';
import { escapeMessage } from './';

const sendMessage = (ctx: Context, message: string) => {
  ctx.replyWithMarkdownV2(escapeMessage(message));
};

export { sendMessage };
