import { Scenes } from 'telegraf';
import { Subject, Notification } from 'services';

interface SceneSession extends Scenes.SceneSessionData {
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

  subject: Subject;
  notification: Notification;
}

export { BotSession, SceneSession };
