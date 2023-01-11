import { Types } from 'mongoose';

interface ICalendar {
  _id?: Types.ObjectId,
  calendarID?: string,
}

export { ICalendar };
