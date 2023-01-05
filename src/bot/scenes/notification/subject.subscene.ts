import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { BotReplies, SceneIDs, CALLBACK_DATA, PeekSubject } from 'consts';
import { BotContext } from 'bot';
import { editOrSend, cleanMessagesBin } from 'helpers';
import { SubjectController } from 'services';

const { enter } = Scenes.Stage;

const subjectSubScene =
  new Scenes.BaseScene<BotContext>(SceneIDs.NOTIFICATION_SUBJECT);

subjectSubScene.enter(async (ctx) => {
  editOrSend(ctx,
    BotReplies().LINK_SUBJECT(),
    await PeekSubject());
});

subjectSubScene.action(
  CALLBACK_DATA.SUBJECT_DISCARD,
  async (ctx) => {
    await cleanMessagesBin(ctx);
  },
);

subjectSubScene.action(
  CALLBACK_DATA.REMOVE_SUBJECT,
  async (ctx) => {
    ctx.session.notification.subject = undefined;
    await ctx.scene.enter(SceneIDs.NOTIFICATION);
  },
);

subjectSubScene.leave(async (ctx) => {
  enter<BotContext>(SceneIDs.NOTIFICATION);
});

subjectSubScene.on(callbackQuery('data'), async (ctx) => {
  const query = ctx.callbackQuery.data;
  if (query.startsWith(CALLBACK_DATA.LINK_SUBJECT)) {
    const subjectID = query.split(CALLBACK_DATA.SPLIT_SYMBOL).at(-1);
    if (subjectID) {
      const subject = await SubjectController.getByID(subjectID);
      ctx.session.notification.subject = subject;
    }
  }
  await ctx.scene.enter(SceneIDs.NOTIFICATION);
});

export { subjectSubScene };
