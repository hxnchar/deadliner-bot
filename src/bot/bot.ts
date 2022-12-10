import { Telegraf, Scenes, session } from 'telegraf';
import { BotCommands, SceneIDs } from 'consts';
import { BOT_CONFIG } from 'configs';
import {
  BotContext,
  newSubjectScene,
  notificationScene,
  settingsScene,
  deadlineScene,
} from 'bot';
import { BotService } from 'services';

const bot = new Telegraf<BotContext>(BOT_CONFIG.token);

const { enter } = Scenes.Stage;
const stage = new Scenes.Stage<BotContext>([
  newSubjectScene,
  notificationScene,
  settingsScene,
  deadlineScene,
]);
bot.use(session());
bot.use(stage.middleware());

const botService = new BotService(bot);
botService.setup();

bot.start((ctx) => botService.start(ctx));
bot.help((ctx) => botService.help(ctx));
bot.hears(BotCommands.NEW_SUBJECT, enter<BotContext>(SceneIDs.NEW_SUBJECT));
bot.hears(BotCommands.NEW_DEADLINE, enter<BotContext>(SceneIDs.NEW_DEADLINE));
bot.hears(BotCommands.NOTIFICATION, enter<BotContext>(SceneIDs.NOTIFICATION));
bot.hears(BotCommands.SETTINGS, enter<BotContext>(SceneIDs.SETTINGS));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
