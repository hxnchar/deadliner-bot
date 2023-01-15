import { Scenes } from 'telegraf';
import { Subject, Notification, User, Task, Reminder } from 'services';
import { Offset } from 'services/offset';

interface SceneSession extends Scenes.SceneSessionData {
  taskBodyInput: boolean;
  taskDateInput: boolean;

  subjectNameInput: boolean;

  notificationHeaderInput: boolean;
  notificationBodyInput: boolean;
  notificationDateInput: boolean;
  notificationSubjectInput: boolean;
  notificationDeadlineInput: boolean;

  calendarIDinput: boolean;

  reminderCountdownInput: boolean;
}

interface BotSession extends Scenes.SceneSession<SceneSession> {
  // Used for editing and deleting target message
  chatID?: number;
  messageID?: number;
  cleanUpMessages: number[];

  // Used for temporary storing of some data
  user: User;
  notification: Notification;
  subject: Subject;
  task: Task;
  reminder?: Reminder;
  offset?: Offset;

  subjectsFromDB: Subject[];
}

export { BotSession, SceneSession };
