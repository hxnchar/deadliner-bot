import { format } from 'date-fns';
import { DateTimeLongFormat } from 'consts/dateTime.format';
import { commandsString } from 'consts/replies/described-commands.constant';
import { featuresList } from 'consts/replies/bot-features.constant';
import { Subject, Notification, User } from 'services';
import { Deadline } from 'services/deadline';

const BotReplies = {
  START: `Welcome to *Deadliner*.\n\nThis bot may help you with tracking your deadlines. It has several features that make him more useful than the last one.\n${featuresList}`,
  NEW_SUBJECT: (subject: Subject = new Subject()) =>
    `You're creating a new subject. Please, provide the following details:\n\n${subject.toString()}`,
  DEADLINE: (deadline: Deadline = new Deadline()) =>
    `You're creating a new deadline. Please, provide the following details:\n\n${deadline.toString()}`,
  NOTIFICATION: (notification: Notification = new Notification()) => {
    const sendOn = notification.date ? `${format(notification.date, DateTimeLongFormat)}` : 'right now';
    return `You are about to create a new notification.\nIt will be sent ${notification.date ? 'on ' : ''}*${sendOn}*\nPreview:\n\n${notification.toString()}`;
  },
  SETTINGS: (user: User = new User()) => user.toString(),
  PEEK_PERSONAL: 'Pick subjects which you would like to subscribe to:',
  LINK_SUBJECT: 'Link a subject from the following list:',
  NEW_SUBJECT_SAVE: 'Subject was saved.',
  HELP: `Here is the list of avaiable commands:\n${commandsString}`,
};

export { BotReplies };
