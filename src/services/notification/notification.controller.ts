import { Notification } from 'services/notification/notification.service';
import { NotificationModel } from 'services/notification/notification.model';

const NotificationController = {

  async save(notification: Notification) {
    const notificationModel =
      new NotificationModel(notification.convertToObject());
    await notificationModel.save();
  },

  async getAll() {
    const notifications = await NotificationModel.find();
    console.log(`notifications: ${notifications}`);
    return notifications.map((notification) =>
      Notification.parse(notification));
  },

};

export default NotificationController;
