import { google } from 'googleapis';
import { CALENDAR_CONFIG } from 'configs';
import { BotService, ICalendar } from '..';
import { LangData } from 'consts/langdata.constant';
import { Types } from 'mongoose';

class Calendar {
  _id: Types.ObjectId | undefined;
  _calendarID: string | undefined;
  _target;
  _auth: any;

  constructor(calendarID?: string) {
    this.calendarID = calendarID;
    this._target = google.calendar({ version: 'v3' });
  }

  get id() {
    return this._id;
  }

  set id(newID) {
    this._id = newID;
  }

  get calendarID() {
    return this._calendarID;
  }

  set calendarID(newCalendarID) {
    this._calendarID = newCalendarID;
    this._auth = new google.auth.JWT(
      newCalendarID,
      undefined,
      CALENDAR_CONFIG.private_key_id,
      'https://www.googleapis.com/_auth/calendar',
    );
  }

  convertToObject() {
    return {
      _id: this.id,
      calendarID: this.calendarID,
    };
  }

}

Calendar.prototype.toString = function calendarToString() {
  const LANG = BotService.language;
  return `*${LangData[LANG]['calendar-id']}*: ${this.calendarID ?? LangData[LANG]['not-defined']}`;
};

export { Calendar };
