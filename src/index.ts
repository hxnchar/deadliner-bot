import { Telegraf, Scenes, session } from 'telegraf';
import { BOT_CONFIG } from './configs';
import { BotCommands, commandsList, newSubjectScene, notificationScene, SceneIDs } from './constants';
import { BotService } from './services';
import { BotContext } from './helpers';

const bot = new Telegraf<BotContext>(BOT_CONFIG.token);

const { enter } = Scenes.Stage;
const stage = new Scenes.Stage<BotContext>(
  [newSubjectScene, notificationScene]);
bot.use(session());
bot.use(stage.middleware());

bot.telegram.setMyCommands(commandsList);

const botService = new BotService();

bot.start((ctx) => botService.start(ctx));
bot.help((ctx) => botService.help(ctx));
bot.hears(BotCommands.NEW_SUBJECT, enter<BotContext>(SceneIDs.NEW_SUBJECT));
bot.hears(BotCommands.NOTIFICATION, enter<BotContext>(SceneIDs.NOTIFICATION));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
