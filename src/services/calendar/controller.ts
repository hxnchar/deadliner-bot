import { Types } from 'mongoose';
import { Calendar } from 'services/calendar/service';
import { CalendarModel } from 'services/calendar/model';
import { IEvent } from 'services/event';
import { ICalendar } from './interface';

const CalendarController = {

  parse(object: ICalendar) {
    const calendar = new Calendar(object.calendarID);
    calendar.id = object._id;

    return calendar;
  },

  async save(calendar: Calendar): Promise<ICalendar | undefined | null> {
    const exists = await this.exists(calendar.id),
          object = calendar.convertToObject();

    if (exists) {
      return CalendarModel.findOneAndUpdate(
        { _id: calendar.id },
        object,
        { new: true },
      );
    }

    const model = new CalendarModel(object);
    return model.save();
  },

  async returnSaved(calendar: Calendar): Promise<Calendar | undefined> {
    const model = await this.save(calendar);
    if (!model) return undefined;

    return this.parse(model);
  },

  async getByID(id: Types.ObjectId | undefined): Promise<Calendar | undefined> {
    if (!id) return undefined;

    const model = await CalendarModel.findOne({ _id: id });
    if (!model) return undefined;

    return this.parse(model);
  },

  async exists(id: Types.ObjectId | undefined): Promise<boolean> {
    return (await CalendarModel.find({ _id: id })).length > 0;
  },

  async insertEvent(calendar: Calendar, event: IEvent) {
    const auth = calendar._auth,
          calendarID = calendar.calendarID;

    await calendar._target.events.insert({
      auth,
      calendarId: calendarID,
      requestBody: event,
    });
  },

};

export { CalendarController };
