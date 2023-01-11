import { Types } from 'mongoose';
import { Calendar } from 'services/calendar/service';
import { CalendarModel } from 'services/calendar/model';
import { IEvent } from 'services/event';
import { ICalendar } from './interface';

const CalendarController = {

  async save(calendar: Calendar): Promise<ICalendar | undefined | null> {
    const exists = await this.exists(calendar.id);
    const object = calendar.convertToObject();

    if (exists) {
      return CalendarModel.findOneAndUpdate(
        { _id: calendar.id }, object);
    }

    const model = new CalendarModel(object);
    return model.save();
  },

  async getByID(id: Types.ObjectId | undefined): Promise<Calendar | undefined> {
    if (!id) return undefined;

    const model = await CalendarModel.findOne({ _id: id });
    if (!model) return undefined;

    return Calendar.parse(model);
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
