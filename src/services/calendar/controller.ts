import { Calendar } from 'services/calendar/service';
import { CalendarModel } from 'services/calendar/model';
import { IEvent } from 'services/event';

const CalendarController = {

  async save(calendar: Calendar) {
    const calendarModel =
      new CalendarModel(calendar.convertToObject());
    await calendarModel.save();
  },

  async getByID(id: string | undefined): Promise<Calendar | undefined> {
    if (!id) return undefined;
    const calendar = await CalendarModel.findOne({ _id: id });
    if (!calendar) return undefined;
    return Calendar.parse(calendar);
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
