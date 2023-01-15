import { Schema, model, Types } from 'mongoose';
import { ModelName } from 'consts/enums';
import { IReminder } from './interface';

const ReminderSchema = new Schema({
  type: {
    type: String,
    enum: ['remind-by-bot', 'remind-by-email', 'remind-by-calendar'],
    default: 'remind-by-bot',
  },
  offset: { 'type': String, 'unique': false, 'required': false },
});

const ReminderModel = model<IReminder>(ModelName.REMINDER, ReminderSchema);

export { ReminderSchema, ReminderModel };
