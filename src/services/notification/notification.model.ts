import { Schema, model, Types } from 'mongoose';
import { ModelName } from 'consts/enums';

const NotificationModel = new Schema({
  header: { 'type': String, 'unique': false, 'required': true },
  body: { 'type': String, 'unique': false, 'required': true },
  date: { 'type': Date, 'unique': false, 'required': true },
  deadline: { 'type': Date, 'unique': false, 'required': true },
  isRequired: { 'type': Boolean, 'unique': false, 'required': true },
  subjectID: { 'type': Types.ObjectId, ref: ModelName.SUBJECT, 'unique': false, 'required': true },
});

export default model(ModelName.NOTIFICATION, NotificationModel);
