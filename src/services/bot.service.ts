import { Telegraf } from 'telegraf';
import { BotContext } from 'bot';
import { sendMessage } from 'helpers';
import { BotReplies, commandsList } from 'consts';
import { Language } from 'consts/enums';
import { Database } from 'database';
import { DB_CONFIG } from 'configs';
import { Task, TaskController } from 'services/task';
import { Notification, NotificationController } from 'services/notification';
import { UserController } from 'services/user';

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
    await this._target.telegram.setMyCommands(commandsList);
  }

  async start(ctx: BotContext) {
    const userID = ctx.from?.id,
          username = ctx.from?.username;
    const userExists = await UserController.exists(ctx.from?.id);
    if (!userExists) {
      const newUser = await UserController.create(userID, username);
      await UserController.save(newUser);
    }
    return sendMessage(ctx, BotReplies.START());
  }

  help(ctx: BotContext) {
    return sendMessage(ctx, BotReplies.HELP);
  }

  async todolist(ctx: BotContext) {
    const tasks = await TaskController.getAll();
    const notifications = await NotificationController.getAll();

    let todolist: (Task | Notification)[] = [...tasks, ...notifications];

    todolist = todolist.sort((a, b) => {
      if (!a.date || !b.date || a.date === b.date) {
        return 0;
      }
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });

    const message = todolist.map((todo) => todo.toString()).join('\n');

    return sendMessage(ctx, message);
  }

}

export { BotService };
