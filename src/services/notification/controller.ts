import { Notification } from 'services/notification/service';
import { NotificationModel } from 'services/notification/model';
import { INotification } from 'services/notification/interface';

const NotificationController = {

  parse(object: INotification): Notification {
    const { _id, header, body, deadline, isRequired, subject } = object;

    const notification = new Notification(
      header,
      body,
      deadline,
      isRequired,
      subject,
    );
    notification.id = _id;

    return notification;
  },

  async save(notification: Notification) {
    const model = new NotificationModel(notification.mongooseObject);
    return model.save();
  },

  async returnSaved(notification: Notification)
  : Promise<Notification | undefined> {
    const model = await this.save(notification);
    if (!model) return undefined;

    return this.parse(model);
  },

  async getAll() {
    const notifications = await NotificationModel.find();
    return notifications.map((notification) =>
      this.parse(notification));
  },

};

export { NotificationController };
