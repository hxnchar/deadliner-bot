import { Schema, model, Types } from 'mongoose';
import { SubjectModel, SubjectSchema } from 'services/subject/model';
import { ReminderModel, ReminderSchema } from 'services/reminder/model';
import { ModelName } from 'consts/enums';
import { IUser } from 'services/user/interface';

const UserSchema = new Schema({
  id: { 'type': Number, 'unique': true, 'required': true },
  chatID: { 'type': Number, 'unique': true, 'required': true },
  name: { 'type': String, 'unique': false, 'required': false },
  subjects: { 'type': [SubjectSchema], ref: SubjectModel },
  reminders: { 'type': [ReminderSchema], ref: ReminderModel },
  calendar: { 'type': Types.ObjectId, 'unique': true, 'required': false },
  language: { 'type': String, 'unique': false, 'default': 'en' },
});

const UserModel = model<IUser>(ModelName.USER, UserSchema);

export { UserSchema, UserModel };
