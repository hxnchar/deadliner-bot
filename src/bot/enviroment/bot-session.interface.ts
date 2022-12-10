import { Scenes } from 'telegraf';
import { Subject, Notification, User } from 'services';
import { Deadline } from 'services/deadline';

interface SceneSession extends Scenes.SceneSessionData {
  deadlineTaskInput: boolean;
  deadlineDateInput: boolean;

  subjectNameInput: boolean;

  notificationHeaderInput: boolean;
  notificationBodyInput: boolean;
  notificationDateInput: boolean;
  notificationSubjectInput: boolean;
  notificationDeadlineInput: boolean;
}

interface BotSession extends Scenes.SceneSession<SceneSession> {
  chatID: number | undefined;
  messageID: number | undefined;
  cleanUpMessages: number[];

  subjectsFromDB: Subject[];
  subject: Subject;
  notification: Notification;
  user: User;
  deadline: Deadline;
}

export { BotSession, SceneSession };
