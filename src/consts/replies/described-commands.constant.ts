import { BotCommand } from 'telegraf/typings/core/types/typegram';
import { BotCommands } from 'consts/enums';

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

const describedCommands: DescribedCommand[] = [
  new DescribedCommand(BotCommands.START, 'The basic command that you cannot avoid'),
  new DescribedCommand(BotCommands.NEW_SUBJECT, 'Creates a new subject'),
  new DescribedCommand(BotCommands.NOTIFICATION, 'Sends a notification to your classmates'),
  new DescribedCommand(BotCommands.NEW_DEADLINE, 'Creates a new deadline'),
  new DescribedCommand(BotCommands.TODOLIST, 'Shows all of your deadlines and notifications'),
  new DescribedCommand(BotCommands.TODO, 'Shows your deadlines and notifications one by one, sorted by date'),
  new DescribedCommand(BotCommands.SETTINGS, 'Change your preferences here'),
  new DescribedCommand(BotCommands.HELP, 'Shows a list of available commands'),
];

const commandsToString = (commands: DescribedCommand[]): string => {
  const stringifiedCommands: string[] = commands.map(
    (command) => `\n${command.toString()}`,
  );
  return stringifiedCommands.join('\n');
};

const commandsToList = (commands: DescribedCommand[]): BotCommand[] => {
  const commandsList: BotCommand[] = [];
  commands.forEach((command) =>
    commandsList.push({
      ...command,
    }),
  );
  return commandsList;
};

const commandsString = commandsToString(describedCommands);
const commandsList = commandsToList(describedCommands);

export { commandsString, commandsList };
