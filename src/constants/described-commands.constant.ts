import { IDescribe } from '../helpers';
import { BotCommands } from './bot-commands.enum';

class DescribedCommand implements IDescribe {
  name: string = '';
  description: string = '';

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

DescribedCommand.prototype.toString = function featureToString() {
  return `${this.name} — ${this.description}`;
};

const describedCommands: DescribedCommand[] = [
  new DescribedCommand(
    BotCommands.START,
    'The basic command that you cannot avoid',
  ),
  new DescribedCommand(
    BotCommands.HELP,
    'Shows a list of available commands',
  ),
];

const commandsToString = (commands: DescribedCommand[]): string => {
  const stringifiedCommands: string[] =
    commands.map((command) => `\n${command.toString()}`);
  return stringifiedCommands.join('\n');
};

const commandsList = commandsToString(describedCommands);

export { commandsList };
