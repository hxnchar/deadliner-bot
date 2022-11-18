import { Scenes } from 'telegraf';
import { Subject } from '../services';

interface SceneSession extends Scenes.SceneSessionData {
  nameInput: boolean;
  subject: Subject;
}

interface BotSession extends Scenes.SceneSession<SceneSession> {
  chatID: number | undefined;
  messageID: number | undefined;
  cleanUpMessages: number[];
}

export { BotSession, SceneSession };
