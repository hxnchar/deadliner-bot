import { Scenes } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { parse } from 'date-fns';
import { BotReplies, SceneIDs, NotificationKeyboard, CALLBACK_DATA, DateTimeCommonFormat, BotCommands, PeekSubject } from 'consts';
import { BotContext } from 'bot';
import { Notification, SubjectController } from 'services';
import { sendMessage, editMessageByID, messageToBin, cleanMessagesBin, deleteMessage } from 'helpers';
import NotificationController from 'services/notification/notification.controller';


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
  const headerInput = ctx.scene.session.notificationHeaderInput,
        bodyInput = ctx.scene.session.notificationBodyInput,
        dateInput = ctx.scene.session.notificationDateInput,
        deadlintInput = ctx.scene.session.notificationDeadlineInput;
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
      parse(data, DateTimeCommonFormat, new Date());
    return true;
  }

  return false;
};

const updateMessage = async (ctx: BotContext) => {
  await cleanMessagesBin(ctx);
  await editMessageByID(
    ctx,
    BotReplies.NOTIFICATION(ctx.session.notification),
    NotificationKeyboard,
  );
};

const notificationScene =
  new Scenes.BaseScene<BotContext>(SceneIDs.NOTIFICATION);

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

notificationScene.action(CALLBACK_DATA.NOTIFICATION_DISCARD, async (ctx) => {
  await ctx.scene.leave();
});

notificationScene.action(
  CALLBACK_DATA.NOTIFICATION_SET_SUBJECT,
  async (ctx) => {
    const sentMessage =
      await sendMessage(ctx,
        BotReplies.LINK_SUBJECT,
        await PeekSubject());
    messageToBin(ctx, sentMessage.message_id);
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
  CALLBACK_DATA.NOTIFICATION_SAVE,
  async (ctx) => {
    try {
      const targetNotification = ctx.session.notification;
      await NotificationController.save(targetNotification);
      await ctx.answerCbQuery(`Notification ${targetNotification.date ? 'was scheduled' : 'has been sent'} successfully`);
      ctx.session.notification = new Notification();
      await ctx.scene.leave();
    } catch (e: any) {
      await ctx.answerCbQuery(`${e.message}`);
    }
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
  CALLBACK_DATA.SUBJECT_DISCARD,
  async (ctx) => {
    await cleanMessagesBin(ctx);
  },
);

notificationScene.action(
  CALLBACK_DATA.NOTIFICATION_RESET,
  async (ctx) => {
    ctx.session.notification = new Notification();
    await updateMessage(ctx);
  },
);

notificationScene.action(
  CALLBACK_DATA.REMOVE_SUBJECT,
  async (ctx) => {
    ctx.session.notification.subject = undefined;
    await updateMessage(ctx);
  },
);

notificationScene.hears(BotCommands.NOTIFICATION,
  async (ctx) => ctx.scene.reenter());

notificationScene.on(callbackQuery('data'), async (ctx) => {
  const query = ctx.callbackQuery.data;
  if (query.startsWith(CALLBACK_DATA.LINK_SUBJECT)) {
    const subjectID = query.split(CALLBACK_DATA.SPLIT_SYMBOL).at(-1);
    if (subjectID) {
      const subject = await SubjectController.getByID(subjectID);
      ctx.session.notification.subject = subject;
    }
  }
  await updateMessage(ctx);
});

notificationScene.on('text', async (ctx) => {
  const messageText = ctx.message.text;
  const dataChanged = setNotificationData(ctx, messageText);
  if (dataChanged) {
    messageToBin(ctx);
    await updateMessage(ctx);
  }
});

notificationScene.leave(async (ctx) => {
  if (ctx.session.messageID) {
    try {
      await deleteMessage(ctx, ctx.session.messageID);
    } catch (e: any) {
      await ctx.answerCbQuery(`${e.message}`);
    }
  }
});

export { notificationScene };
