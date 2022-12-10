import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { BotReplies, SceneIDs, CALLBACK_DATA, BotCommands, SettingsKeyboard, PeekPersonalSubject } from 'consts';
import { BotContext } from 'bot';
import { User, Subject, UserController } from 'services';
import { sendMessage, editMessageByID, messageToBin, cleanMessagesBin, deleteMessage } from 'helpers';


const loadData = async (ctx: BotContext) => {
  const userID = ctx.message?.from.id;
  const userFromDB = await UserController.getByID(userID);
  ctx.session.user = userFromDB;
};

const resetSession = (ctx: BotContext) => {
  ctx.session.user = new User();
};

const updatePersonalSubjectsMessage = async (ctx: BotContext) => {
  await editMessageByID(
    ctx,
    BotReplies.PEEK_PERSONAL,
    await PeekPersonalSubject(ctx, ctx.session.user.subjects),
  );
};

const updateSettingsMessage = async (ctx: BotContext) => {
  editMessageByID(
    ctx,
    BotReplies.SETTINGS(ctx.session.user),
    SettingsKeyboard,
  );
};

const settingsScene = new Scenes.BaseScene<BotContext>(SceneIDs.SETTINGS);

settingsScene.enter(async (ctx) => {
  await loadData(ctx);

  const sentMessage =
    await sendMessage(ctx,
      BotReplies.SETTINGS(ctx.session.user),
      SettingsKeyboard);

  ctx.session.messageID = sentMessage.message_id;
  ctx.session.chatID = sentMessage.chat.id;
});

settingsScene.hears(BotCommands.SETTINGS, (ctx) => ctx.scene.reenter());

settingsScene.action(CALLBACK_DATA.SETTINGS_SUBJECTS, async (ctx) => {
  updatePersonalSubjectsMessage(ctx);
});

settingsScene.action(CALLBACK_DATA.SUBJECT_SAVE_PERSONAL_LIST, (ctx) => {
  updateSettingsMessage(ctx);
});

settingsScene.action(CALLBACK_DATA.SETTINGS_DISCARD, (ctx) => {
  resetSession(ctx);
  ctx.scene.leave();
});

settingsScene.action(CALLBACK_DATA.SETTINGS_SAVE, (ctx) => {
  try {
    UserController.save(ctx.session.user);
    ctx.answerCbQuery('Settings updated successfully');
    ctx.scene.leave();
  } catch (e: any) {
    ctx.answerCbQuery(`${e.message}`);
  }
});

settingsScene.on(callbackQuery('data'), async (ctx) => {
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

    updatePersonalSubjectsMessage(ctx);
  }
});

settingsScene.leave(async (ctx) => {
  if (ctx.session.messageID) {
    try {
      deleteMessage(ctx, ctx.session.messageID);
    } catch (e: any) {
      ctx.answerCbQuery(`${e.message}`);
    }
  }
});

export { settingsScene };
