import { Schema, model, Types } from 'mongoose';
import { ModelName } from 'consts/enums';
import { INotification } from 'services/notification/interface';

const NotificationSchema = new Schema({
  header: { 'type': String, 'unique': false, 'required': true },
  body: { 'type': String, 'unique': false, 'required': true },
  deadline: { 'type': Date, 'unique': false, 'required': true },
  isRequired: { 'type': Boolean, 'unique': false, 'required': true },
  subject: { 'type': Types.ObjectId, ref: ModelName.SUBJECT, 'unique': false, 'required': true },
});

const NotificationModel =
  model<INotification>(ModelName.NOTIFICATION, NotificationSchema);

export { NotificationSchema, NotificationModel };
