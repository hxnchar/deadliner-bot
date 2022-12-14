import { BotCommand } from 'telegraf/typings/core/types/typegram';
import { BotCommands } from 'consts/enums';
import { BotService } from 'services/bot.service';
import { LangData } from 'consts/langdata.constant';

class DescribedCommand {
  command: string = '';
  description: string = '';

  constructor(command: string, description: string) {
    this.command = command;
    this.description = description;
  }
}

DescribedCommand.prototype.toString = function featureToString() {
  return `${this.command} — ${this.description}`;
};

const describedCommands = (): DescribedCommand[] => {
  const LANG = BotService.language;

  return [
    new DescribedCommand(BotCommands.START, LangData[LANG]['bot-command-start']),
    new DescribedCommand(BotCommands.NEW_SUBJECT, LangData[LANG]['bot-command-new-subject']),
    new DescribedCommand(BotCommands.NOTIFICATION, LangData[LANG]['bot-command-notification']),
    new DescribedCommand(BotCommands.NEW_TASK, LangData[LANG]['bot-command-new-task']),
    new DescribedCommand(BotCommands.TODOLIST, LangData[LANG]['bot-command-todolist']),
    new DescribedCommand(BotCommands.TODO, LangData[LANG]['bot-command-todo']),
    new DescribedCommand(BotCommands.SETTINGS, LangData[LANG]['bot-command-settings']),
    new DescribedCommand(BotCommands.HELP, LangData[LANG]['bot-command-help']),
  ];
};

const commandsToString = (): string => {
  const commands = describedCommands();
  const stringifiedCommands: string[] = commands.map(
    (command) => `\n${command.toString()}`,
  );
  return stringifiedCommands.join('\n');
};

const commandsToList = (): BotCommand[] => {
  const commands = describedCommands();
  const commandsList: BotCommand[] = [];
  commands.forEach((command) =>
    commandsList.push({
      ...command,
    }),
  );
  return commandsList;
};

export { commandsToString, commandsToList };
