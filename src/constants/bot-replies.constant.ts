import { Subject } from '../services/subject/subject.class';
import { featuresList } from './bot-features.constant';
import { commandsList } from './described-commands.constant';

const BotReplies = {
  START: `Welcome to *Deadliner*.\n\nThis bot may help you with tracking your deadlines. It has several features that make him more useful than the last one.\n${featuresList}`,
  NEW_SUBJECT: (subject: Subject = new Subject()) =>
    `You're creating a new subject. Please, provide the following details:\n\n${subject.toString()}`,
  NEW_SUBJECT_SAVE: 'Subject was saved.',
  NEW_SUBJECT_DISCARD:
    'Creation was canceled. It will be saved to the local storage till next restart.',
  HELP: `Here is the list of avaiable commands:\n${commandsList}`,
};

export { BotReplies };
