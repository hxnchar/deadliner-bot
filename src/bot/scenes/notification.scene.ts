import { Scenes } from 'telegraf';
import { parse } from 'date-fns';
import { sendMessage, editMessageByID, messageToBin, cleanMessagesBin } from 'helpers';
import { BotReplies, SceneIDs, NotificationKeyboard, CALLBACK_DATA, DateTimeCommonFormat, BotCommands } from '../../constants';
import { Notification } from 'services';
import { BotContext } from 'bot/enviroment'

const resetFlags = (ctx: BotContext) => {
  ctx.scene.session.notificationHeaderInput = false;
  ctx.scene.session.notificationBodyInput = false;
  ctx.scene.session.notificationDateInput = false;
  ctx.scene.session.notificationDeadlineInput = false;
  ctx.scene.session.notificationSubjectInput = false;
}

const resetSession = (ctx: BotContext) => {
  ctx.session.notification =
    ctx.session.notification === undefined ?
      new Notification() : ctx.session.notification;
  resetFlags(ctx);
}

const setNotificationData = (ctx: BotContext, data: string): boolean => {
  const headerInput = ctx.scene.session.notificationHeaderInput,
        bodyInput = ctx.scene.session.notificationBodyInput,
        dateInput = ctx.scene.session.notificationDateInput,
        deadlintInput = ctx.scene.session.notificationDeadlineInput,
        subjectInput = ctx.scene.session.notificationSubjectInput;
  if (!ctx.message) {
    return false;
  }
  if (headerInput) {
    ctx.session.notification.header = data;
    return true;
  }
  if (bodyInput) {
    ctx.session.notification.body = data;
    return true;
  }
  if (dateInput) {
    ctx.session.notification.date =
      parse(data, DateTimeCommonFormat, new Date());
    return true;
  }
  if (deadlintInput) {
    ctx.session.notification.deadline =
      parse(data, DateTimeCommonFormat, new Date());;
    return true;
  }
  
  return false;
}

const updateMessage = (ctx: BotContext) => {
  editMessageByID(
    ctx,
    BotReplies.NOTIFICATION(ctx.session.notification),
    NotificationKeyboard,
  );
};

const notificationScene
  = new Scenes.BaseScene<BotContext>(SceneIDs.NOTIFICATION);

notificationScene.enter(async (ctx) => {
  resetSession(ctx);

  const sentMessage =
    await sendMessage(ctx,
      BotReplies.NOTIFICATION(ctx.session.notification),
      NotificationKeyboard);

  ctx.session.messageID = sentMessage.message_id;
  ctx.session.chatID = sentMessage.chat.id;
});

notificationScene.action(CALLBACK_DATA.NOTIFICATION_CHANGE_HEADER,
  async (ctx) => {
    resetFlags(ctx);
    ctx.scene.session.notificationHeaderInput = true;
    const sentMessage = await sendMessage(ctx, 'Please, provide a notification header');
    messageToBin(ctx, sentMessage.message_id);
});

notificationScene.action(CALLBACK_DATA.NOTIFICATION_CHANGE_BODY,
  async (ctx) => {
    resetFlags(ctx);
    ctx.scene.session.notificationBodyInput = true;
    const sentMessage = await sendMessage(ctx, 'Please, provide a notification body');
    messageToBin(ctx, sentMessage.message_id);
});

notificationScene.action(CALLBACK_DATA.NOTIFICATION_CHANGE_DATE,
  async (ctx) => {
    resetFlags(ctx);
    ctx.scene.session.notificationDateInput = true;
    const sentMessage = await sendMessage(ctx, `Please, provide a notification date and time in a following way _${DateTimeCommonFormat}_. Leave it blank if you want to send it now.`);
    messageToBin(ctx, sentMessage.message_id);
});

notificationScene.action(CALLBACK_DATA.NOTIFICATION_CHANGE_DEADLINE,
  async (ctx) => {
    resetFlags(ctx);
    ctx.scene.session.notificationDeadlineInput = true;
    const sentMessage = await sendMessage(ctx, `Please, provide a notification deadline and time in a following way _${DateTimeCommonFormat}_`);
    messageToBin(ctx, sentMessage.message_id);
});

notificationScene.action(CALLBACK_DATA.NOTIFICATION_DISCARD, (ctx) => {
  ctx.scene.leave();
});

notificationScene.action(CALLBACK_DATA.NOTIFICATION_UNDO, (ctx) => {
  try {
    // const response = ctx.scene.session.subject.undo();
    // if (response) {
    //   updateMessage(ctx);
    // }
  } catch (e: any) {
    ctx.answerCbQuery(`${e.message}`);
  }
});

notificationScene.action(CALLBACK_DATA.NOTIFICATION_REDO, (ctx) => {
  try {
    // const response = ctx.scene.session.subject.redo();
    // if (response) {
    //   updateMessage(ctx);
    // }
  } catch (e: any) {
    ctx.answerCbQuery(`${e.message}`);
  }
});


notificationScene.hears(BotCommands.NOTIFICATION, (ctx) => ctx.scene.reenter());

notificationScene.on('text',  (ctx) => {
  const messageText = ctx.message.text;
  const dataChanged = setNotificationData(ctx, messageText);
  if (dataChanged) {
    messageToBin(ctx);
    updateMessage(ctx);
  }
  cleanMessagesBin(ctx);
});

export { notificationScene };
