import { Context, Scenes } from 'telegraf';
import { BotSession, SceneSession } from './bot-session.interface';

interface BotContext extends Context {
  session: BotSession;
  scene: Scenes.SceneContextScene<BotContext, SceneSession>;
}

export { BotContext };
