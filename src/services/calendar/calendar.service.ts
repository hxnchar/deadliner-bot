import { google } from 'googleapis';
import { CALENDAR_CONFIG } from 'configs/calendar.config';

class Calendar {
  _id: string | undefined;
  target;
  auth: any;

  constructor(id?: string) {
    this._id = id;
    this.target = google.calendar({ version: 'v3' });
  }

  get id() {
    return this._id;
  }

  set id(newID) {
    this._id = newID;
    this.auth = new google.auth.JWT(
      newID,
      undefined,
      CALENDAR_CONFIG.key,
      'https://www.googleapis.com/auth/calendar',
    );
  }
}

export { Calendar }
