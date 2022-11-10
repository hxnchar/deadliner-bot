import { IDescribe } from '../helpers';

class Command implements IDescribe {
  name: string = '';
  description: string = '';

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

Command.prototype.toString = function featureToString() {
  return `${this.name} — ${this.description}`;
};

const BotCommands: Command[] = [
  new Command(
    '/start',
    'The basic command that you cannot avoid',
  ),
  new Command(
    '/help',
    'Shows a list of available commands',
  ),
];

const commandsToString = (commands: Command[]): string => {
  const stringifiedCommands: string[] =
    commands.map((command) => `\n${command.toString()}`);
  return stringifiedCommands.join('\n');
};

const commandsList = commandsToString(BotCommands);

export { commandsList };
