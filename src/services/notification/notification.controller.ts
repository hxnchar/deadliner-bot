import { Notification } from 'services/notification/notification.service';
import { NotificationModel } from 'services/notification/notification.model';

const NotificationController = {

  async save(notification: Notification) {
    const notificationModel =
      new NotificationModel(notification.convertToObject());
    await notificationModel.save();
  },

};

export default NotificationController;
