import { ReminderTypes } from 'consts/enums';
import { Types } from 'mongoose';

interface IReminder {
  _id?: Types.ObjectId,
  type?: ReminderTypes,
  offset?: string,
}

export { IReminder };
