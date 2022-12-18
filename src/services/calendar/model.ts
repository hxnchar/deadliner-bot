import { Schema, model } from 'mongoose';
import { ModelName } from 'consts/enums';
import { ICalendar } from './interface';

const CalendarSchema = new Schema({
  calendarID: String,
});

const CalendarModel = model<ICalendar>(ModelName.CALENDAR, CalendarSchema);

export { CalendarSchema, CalendarModel };
