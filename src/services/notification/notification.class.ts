import { format } from 'date-fns';
import { DateTimeLongFormat } from 'consts';
import { Subject } from 'services';

const UNDEFINED_MESSAGE: string = 'Not provided';

class Notification {
  _header: string | undefined = '';
  _body: string | undefined = '';
  _date: Date | undefined;
  _deadline: Date | undefined;
  _isRequired: boolean | undefined = false;
  _subject: Subject | undefined;

  get header() {
    return this._header;
  }

  set header(newHeader) {
    this._header = newHeader;
  }

  get body() {
    return this._body;
  }

  set body(newBody) {
    this._body = newBody;
  }

  get date() {
    return this._date;
  }

  set date(newDate) {
    this._date = newDate;
  }

  get deadline() {
    return this._deadline;
  }

  set deadline(newDeadline) {
    this._deadline = newDeadline;
  }

  get isRequired() {
    return this._isRequired;
  }

  set isRequired(newIsRequired) {
    this._isRequired = newIsRequired;
  }

  get subject() {
    return this._subject;
  }

  set subject(newSubject) { 
    this._subject = newSubject;
  }

  constructor(
    header?: string,
    body?: string,
    date?: Date,
    isRequired?: boolean,
    subject?: Subject,
    ) {
      this.header = header;
      this.body = body;
      this.date = date;
      this.isRequired = isRequired;
      this.subject = subject;
  }

  isEqualTo(notification: Notification): boolean {
    return this.header === notification.header &&
      this.body === notification.body &&
      this.date === notification.date &&
      this.isRequired === notification.isRequired &&
      this.subject === notification.subject;
  }
}

Notification.prototype.toString = function notificationToString() {
  const subject = this.subject? `*Subject:* ${this.subject}\n\n` : '';
  const required = this.isRequired ? '🔴' : '🟡';
  const formattedDeadline = this.deadline ?
   format(this.deadline, DateTimeLongFormat)
   : 'Without deadline';
  return `*${required} ${this.header || UNDEFINED_MESSAGE}*\n${subject}*Due:* ${formattedDeadline}\n\n${this.body || UNDEFINED_MESSAGE}`;
};

export { Notification };
