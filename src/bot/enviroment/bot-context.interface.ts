import { Context, Scenes } from 'telegraf';
import { BotSession, SceneSession } from 'bot/enviroment';

interface BotContext extends Context {
  session: BotSession;
  scene: Scenes.SceneContextScene<BotContext, SceneSession>;
}

export { BotContext };
