import { ReminderTypes } from 'consts/enums';
import { Types } from 'mongoose';

interface IReminder {
  _id?: Types.ObjectId,
  _type?: ReminderTypes,
  _date?: Date,
}

export { IReminder };
