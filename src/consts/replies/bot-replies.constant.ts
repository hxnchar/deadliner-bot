import { format } from 'date-fns';
import { DateTimeLongFormat } from 'consts/dateTime.format';
import { commandsToString } from 'consts/replies/described-commands.constant';
import { featuresToString } from 'consts/replies/bot-features.constant';
import { Subject, Notification, User, Task, BotService } from 'services';
import { LangData } from 'consts/langdata.constant';

const BotReplies = () => {
  const LANG = BotService.language;

  return {
    START: () => `${LangData[LANG]['command-start-header']} *Deadliner*.\n\n${LangData[LANG]['command-start-body']}\n${featuresToString()}`,
    NEW_SUBJECT: (subject: Subject = new Subject()) =>
      `${LangData[LANG]['command-new-subject-body']}:\n\n${subject.toString()}`,
    NEW_TASK: (task: Task = new Task()) =>
      `${LangData[LANG]['command-new-task-body']}:\n\n${task.toString()}`,
    NOTIFICATION: (notification: Notification = new Notification()) => {
      const sendOn = notification.date ? `${format(notification.date, DateTimeLongFormat)}` : 'right now';
      return `${LangData[LANG]['command-new-notification-body']}\n${LangData[LANG]['will-be-sent']}: ${sendOn}*\n${LangData[LANG]['preview']}:\n\n${notification.toString()}`;
    },
    SETTINGS: (user: User = new User()) => user.toString(),
    PEEK_PERSONAL: () => `${LangData[LANG]['command-peek-personal']}:`,
    PEEK_LANGUAGE: () => `${LangData[LANG]['command-peek-language']}:`,
    LINK_SUBJECT: () => `${LangData[LANG]['command-link-subject']}:`,
    HELP: () => `${LangData[LANG]['command-help']}:\n${commandsToString()}`,
  };
};

export { BotReplies };
