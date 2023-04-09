import { Scenes } from 'telegraf';
import { parse } from 'date-fns';
import { BotReplies, SceneIDs, NotificationKeyboard, CALLBACK_DATA, DateTimeCommonFormat, BotCommands, PeekSubject } from 'consts';
import { BotContext } from 'bot';
import { Notification, NotificationController } from 'services';
import { sendMessage, editMessageByID, messageToBin, cleanMessagesBin, deleteMessage, deleteTargetMessage, editOrSend } from 'helpers';

const resetFlags = (ctx: BotContext) => {
  ctx.scene.session.notificationHeaderInput = false;
  ctx.scene.session.notificationBodyInput = false;
  ctx.scene.session.notificationDateInput = false;
  ctx.scene.session.notificationDeadlineInput = false;
  ctx.scene.session.notificationSubjectInput = false;
};

const resetSession = (ctx: BotContext) => {
  ctx.session.notification =
    ctx.session.notification === undefined
      ? new Notification() : ctx.session.notification;
  resetFlags(ctx);
};

const setNotificationData = (ctx: BotContext, data: string): boolean => {
  const inputtingHeader = ctx.scene.session.notificationHeaderInput,
        inputtingBody = ctx.scene.session.notificationBodyInput,
        inputtingDeadline = ctx.scene.session.notificationDeadlineInput;

  if (!ctx.message) return false;

  if (inputtingHeader) {
    ctx.session.notification.header = data;
    return true;
  }

  if (inputtingBody) {
    ctx.session.notification.body = data;
    return true;
  }

  if (inputtingDeadline) {
    ctx.session.notification.deadline =
      parse(data, DateTimeCommonFormat, new Date());
    return true;
  }

  return false;
};

const updateMessage = async (ctx: BotContext) => {
  await cleanMessagesBin(ctx);
  await editMessageByID(
    ctx,
    BotReplies().NOTIFICATION(ctx.session.notification),
    NotificationKeyboard(),
  );
};

const notificationScene =
  new Scenes.BaseScene<BotContext>(SceneIDs.NOTIFICATION);

notificationScene.enter(async (ctx) => {
  resetSession(ctx);

  await editOrSend(ctx,
    BotReplies().NOTIFICATION(ctx.session.notification),
    NotificationKeyboard());
});

notificationScene.action(CALLBACK_DATA.NOTIFICATION_CHANGE_HEADER,
  async (ctx) => {
    resetFlags(ctx);
    ctx.scene.session.notificationHeaderInput = true;
    const sentMessage = await sendMessage(ctx, 'Please, provide a notification header');
    messageToBin(ctx, sentMessage.message_id);
  },
);

notificationScene.action(CALLBACK_DATA.NOTIFICATION_CHANGE_BODY,
  async (ctx) => {
    resetFlags(ctx);
    ctx.scene.session.notificationBodyInput = true;
    const sentMessage = await sendMessage(ctx, 'Please, provide a notification body');
    messageToBin(ctx, sentMessage.message_id);
  },
);

notificationScene.action(CALLBACK_DATA.NOTIFICATION_CHANGE_DATE,
  async (ctx) => {
    resetFlags(ctx);
    ctx.scene.session.notificationDateInput = true;
    const sentMessage = await sendMessage(ctx, `Please, provide a notification date and time in a following way _${DateTimeCommonFormat}_. Leave it blank if you want to send it now.`);
    messageToBin(ctx, sentMessage.message_id);
  },
);

notificationScene.action(CALLBACK_DATA.NOTIFICATION_CHANGE_DEADLINE,
  async (ctx) => {
    resetFlags(ctx);
    ctx.scene.session.notificationDeadlineInput = true;
    const sentMessage = await sendMessage(ctx, `Please, provide a notification deadline and time in a following way _${DateTimeCommonFormat}_`);
    messageToBin(ctx, sentMessage.message_id);
  },
);

notificationScene.action(CALLBACK_DATA.DISCARD, async (ctx) => {
  await deleteTargetMessage(ctx);
  await ctx.scene.leave();
});

notificationScene.action(
  CALLBACK_DATA.NOTIFICATION_SET_SUBJECT,
  async (ctx) => {
    await ctx.scene.enter(SceneIDs.NOTIFICATION_SUBJECT);
  },
);

notificationScene.action(
  CALLBACK_DATA.NOTIFICATION_SET_REQUIRED,
  async (ctx) => {
    if (!ctx.session.notification.isRequired) {
      ctx.session.notification.isRequired = true;
      await updateMessage(ctx);
    }
  },
);

notificationScene.action(
  CALLBACK_DATA.SAVE,
  async (ctx) => {
    const targetNotification = ctx.session.notification;
    await NotificationController.save(targetNotification);
    ctx.session.notification = new Notification();
    await deleteTargetMessage(ctx);
    await ctx.scene.leave();
  },
);

notificationScene.action(
  CALLBACK_DATA.NOTIFICATION_SET_DISPENSABLE,
  async (ctx) => {
    if (ctx.session.notification.isRequired) {
      ctx.session.notification.isRequired = false;
      await updateMessage(ctx);
    }
  },
);

notificationScene.action(
  CALLBACK_DATA.RESET,
  async (ctx) => {
    ctx.session.notification = new Notification();
    await updateMessage(ctx);
  },
);

notificationScene.hears(BotCommands.NOTIFICATION,
  async (ctx) => ctx.scene.reenter());

notificationScene.on('text', async (ctx) => {
  const messageText = ctx.message.text;
  const dataChanged = setNotificationData(ctx, messageText);
  if (dataChanged) {
    messageToBin(ctx);
    await updateMessage(ctx);
  }
});

export { notificationScene };
