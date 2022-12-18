import { Scenes } from 'telegraf';
import { Subject, Notification, User, Task } from 'services';

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
}

interface BotSession extends Scenes.SceneSession<SceneSession> {
  chatID: number | undefined;
  messageID: number | undefined;
  cleanUpMessages: number[];

  subjectsFromDB: Subject[];
  subject: Subject;
  notification: Notification;
  user: User;
  task: Task;
}

export { BotSession, SceneSession };
