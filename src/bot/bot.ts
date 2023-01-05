import { Telegraf, Scenes, session } from 'telegraf';
import { BotCommands, SceneIDs } from 'consts';
import { BOT_CONFIG } from 'configs';
import {
  BotContext,
  newSubjectScene,
  notificationScene,
  settingsMainScene,
  newTaskScene,
  calendarSubScene,
  languageSubScene,
  subjectsSubScene,
  subjectSubScene,
} from 'bot';
import { BotService } from 'services';
import { errorMiddleware, languageMiddleware } from 'middlewares';

const bot = new Telegraf<BotContext>(BOT_CONFIG.token);

const stage = new Scenes.Stage<BotContext>([
  newSubjectScene,
  notificationScene,
  settingsMainScene,
  newTaskScene,
  calendarSubScene,
  languageSubScene,
  subjectsSubScene,
  subjectSubScene,
]);
bot.use(session());
bot.use(stage.middleware());
bot.use(languageMiddleware);
//bot.catch(errorMiddleware);

const botService = new BotService(bot);
botService.setup();

bot.start((ctx) => BotService.start(ctx));
bot.help((ctx) => BotService.help(ctx));
bot.hears(BotCommands.TODOLIST, async (ctx) => botService.todolist(ctx));
bot.hears(BotCommands.NEW_SUBJECT, BotService.enterScene(SceneIDs.NEW_SUBJECT));
bot.hears(BotCommands.NEW_TASK, BotService.enterScene(SceneIDs.NEW_TASK));
bot.hears(BotCommands.NOTIFICATION,
  BotService.enterScene(SceneIDs.NOTIFICATION));
bot.hears(BotCommands.SETTINGS, BotService.enterScene(SceneIDs.SETTINGS));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
