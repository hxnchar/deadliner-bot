import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { BotReplies, SceneIDs, CALLBACK_DATA, PeekPersonalSubject } from 'consts';
import { BotContext } from 'bot';
import { Subject } from 'services';
import { editMessageByID, editOrSend } from 'helpers';

const updateTargetMessage = async (ctx: BotContext) => {
  await editOrSend(
    ctx,
    BotReplies().PEEK_PERSONAL(),
    await PeekPersonalSubject(ctx, ctx.session.user.subjects),
  );
};

const subjectsSubScene =
  new Scenes.BaseScene<BotContext>(SceneIDs.EDIT_PERSONAL_SUBJECTS);

subjectsSubScene.enter(async (ctx) => {
  await updateTargetMessage(ctx);
});

subjectsSubScene.action(
  CALLBACK_DATA.SUBJECT_SAVE_PERSONAL_LIST, async (ctx) => {
    ctx.scene.enter(SceneIDs.SETTINGS);
  });

subjectsSubScene.on(callbackQuery('data'), async (ctx) => {
  const query = ctx.callbackQuery.data;
  if (query.startsWith(CALLBACK_DATA.SUBJECT_SWITCH_PERSONAL)) {
    const subjectID = query.split(CALLBACK_DATA.SPLIT_SYMBOL).at(-1);
    const subject =
      ctx.session.subjectsFromDB
        .filter((subject) => subject.id?.toString() === subjectID)[0];
    const indexOfSubject = Subject.indexOf(ctx.session.user.subjects, subject);
    if (indexOfSubject === -1) {
      ctx.session.user.subjects.push(subject);
    } else {
      ctx.session.user.subjects.splice(indexOfSubject, 1);
    }

    await updateTargetMessage(ctx);
  }
});

subjectsSubScene.leave(async (ctx) => {
  ctx.scene.enter(SceneIDs.SETTINGS);
});

export { subjectsSubScene };
