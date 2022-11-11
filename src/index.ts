import { Telegraf } from 'telegraf';
import { BOT_CONFIG } from './configs';
import { BotCommands } from './constants';
import { BotService } from './services/bot.service';

const bot = new Telegraf(BOT_CONFIG.token);
const botService = new BotService();

bot.start((ctx) => botService.start(ctx));
bot.help((ctx) => botService.help(ctx));
bot.hears(BotCommands.NEW_SUBJECT, (ctx) => botService.newSubject(ctx));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
