import { Telegraf, Scenes } from 'telegraf';
import { BotContext } from 'bot';
import { sendMessage } from 'helpers';
import { BotReplies, commandsToList } from 'consts';
import { Language } from 'consts/enums';
import { Database } from 'database';
import { DB_CONFIG } from 'configs';
import { Task, TaskController } from 'services/task';
import { Notification, NotificationController } from 'services/notification';
const { enter } = Scenes.Stage;

class BotService {
  _database;
  _target;
  static _language: Language = Language.en;

  static get language() {
    return BotService._language;
  }

  static set language(newLanguage: Language) {
    BotService._language = newLanguage;
  }

  constructor(bot: Telegraf<BotContext>) {
    this._database = new Database(DB_CONFIG.uri);
    this._target = bot;
  }

  async setup() {
    await this._database.connect();
    await this._target.telegram.setMyCommands(commandsToList());
  }

  static start(ctx: BotContext) {
    return sendMessage(ctx, BotReplies().START());
  }

  static help(ctx: BotContext) {
    return sendMessage(ctx, BotReplies().HELP());
  }

  static enterScene(sceneID: string) {
    return enter<BotContext>(sceneID);
  }

  static async leaveScene(ctx: BotContext) {
    await ctx.scene.leave();
  }

  async todolist(ctx: BotContext) {
    const tasks = await TaskController.getAll();
    const notifications = await NotificationController.getAll();

    let todoList: (Task | Notification)[] = [...tasks, ...notifications];

    todoList = todoList.sort((a, b) => {
      const aDeadline = a.deadline,
            bDeadline = b.deadline;

      if (!aDeadline || !bDeadline || aDeadline === bDeadline) {
        return 0;
      }

      return aDeadline > bDeadline ? 1 : -1;
    });

    const message = todoList.map((todo) => todo.toString()).join('\n');

    return sendMessage(ctx, message);
  }

}

export { BotService };
