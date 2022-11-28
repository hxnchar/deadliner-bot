import { format } from 'date-fns';
import { Subject, Notification } from 'services';
import { commandsString } from 'consts/replies/described-commands.constant';
import { featuresList } from 'consts/replies/bot-features.constant';
import { DateTimeLongFormat } from 'consts';

const BotReplies = {
  START: `Welcome to *Deadliner*.\n\nThis bot may help you with tracking your deadlines. It has several features that make him more useful than the last one.\n${featuresList}`,
  NEW_SUBJECT: (subject: Subject = new Subject()) =>
    `You're creating a new subject. Please, provide the following details:\n\n${subject.toString()}`,
  NOTIFICATION: (notification: Notification = new Notification()) => {
    const sendOn = notification.date ? `${format(notification.date, DateTimeLongFormat)}` : 'right now';
    return `You are about to create a new notification.\nIt will be sent ${notification.date ? 'on ' : ''}*${sendOn}*\nPreview:\n\n${notification.toString()}`;
  },
  LINK_SUBJECT: 'Link a subject from the following list:',
  NEW_SUBJECT_SAVE: 'Subject was saved.',
  NEW_SUBJECT_DISCARD:
    'Creation was canceled. It will be saved to the local storage till next restart.',
  HELP: `Here is the list of avaiable commands:\n${commandsString}`,
};

export { BotReplies };
