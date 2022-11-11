import Subject from '../services/subject/subject.class';
import { featuresList } from './bot-features.constant';
import { commandsList } from './described-commands.constant';

const BotReplies = {
  START: `Welcome to *Deadliner*.\nThis bot may help you with tracking your deadlines. It has several features that make him more useful than the last one.\n${featuresList}`,
  NEW_SUBJECT: `You're creating a new subject. Please, provide the following details:\n\n${new Subject().toString()}`,
  HELP: `Here is the list of avaiable commands:\n${commandsList}`,
};

export { BotReplies };
