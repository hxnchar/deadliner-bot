import { Types } from 'mongoose';
import { Calendar } from 'services/calendar/service';
import { CalendarModel } from 'services/calendar/model';
import { IEvent } from 'services/event';
import { ICalendar } from './interface';

const CalendarController = {

  async save(calendar: Calendar): Promise<ICalendar | undefined | null> {
    const calendarExists = await this.exists(calendar.id);
    const calendarObject = calendar.convertToObject();
    if (calendarExists) {
      return CalendarModel.findOneAndUpdate(
        { _id: calendar.id }, calendarObject);
    }
    const calendarModel = new CalendarModel(calendarObject);
    return calendarModel.save();
  },

  async getByID(id: Types.ObjectId | undefined): Promise<Calendar | undefined> {
    if (!id) return undefined;
    const calendar = await CalendarModel.findOne({ _id: id });
    if (!calendar) return undefined;
    return Calendar.parse(calendar);
  },

  async exists(id: Types.ObjectId | undefined): Promise<boolean> {
    return (await CalendarModel.find({ _id: id })).length > 0;
  },

  async insertEvent(calenadar: Calendar, event: IEvent) {
    const auth = calenadar._auth,
          calendarID = calenadar.calendarID;
    await calenadar._target.events.insert({
      auth,
      calendarId: calendarID,
      requestBody: event,
    });
  },

};

export { CalendarController };
