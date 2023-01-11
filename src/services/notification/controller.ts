import { Notification } from 'services/notification/service';
import { NotificationModel } from 'services/notification/model';

const NotificationController = {

  async save(notification: Notification) {
    const model = new NotificationModel(notification.convertToObject());
    await model.save();
  },

  async getAll() {
    const notifications = await NotificationModel.find();
    return notifications.map((notification) =>
      Notification.parse(notification));
  },

};

export { NotificationController };
