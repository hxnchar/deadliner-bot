import { Types } from 'mongoose';
import { format } from 'date-fns';
import { DateTimeLongFormat } from 'consts';
import { Subject } from 'services';
import { INotification } from 'services/notification/interface';

const UNDEFINED_MESSAGE: string = 'Not provided';

class Notification implements INotification {
  _id: Types.ObjectId | undefined;
  _body: string | undefined = '';
  _deadline: Date | undefined;
  _subject: Subject | undefined;
  _header: string | undefined = '';
  _isRequired: boolean | undefined = false;

  get id() {
    return this._id;
  }

  set id(newID) {
    this._id = newID;
  }

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

  get mongooseObject(): any {
    if (typeof this.header === 'undefined') {
      throw new Error('Please, provide header');
    }
    if (typeof this.body  === 'undefined') {
      throw new Error('Please, provide body');
    }
    if (typeof this.deadline  === 'undefined') {
      throw new Error('Please, provide a deadline');
    }
    if (typeof this.isRequired === 'undefined') {
      throw new Error('Please, provide if notification is required');
    }
    return {
      _id: this.id,
      header: this.header,
      body: this.body,
      deadline: this.deadline,
      isRequired: this.isRequired,
      subject: this.subject?.convertToObject(),
    };
  }

  constructor(
    header?: string,
    body?: string,
    deadline?: Date,
    isRequired?: boolean,
    subject?: Subject,
  ) {
    this.body = body;
    this.deadline = deadline;
    this.subject = subject;
    this.header = header;
    this.isRequired = isRequired;
  }

  isEqualTo(notification: Notification): boolean {
    return this.header === notification.header &&
      this.body === notification.body &&
      this.deadline === notification.deadline &&
      this.isRequired === notification.isRequired &&
      this.subject === notification.subject;
  }

}

Notification.prototype.toString = function notificationToString() {
  const subject = this.subject ? `*Subject:* ${this.subject.name}\n\n` : '';
  const required = this.isRequired ? '🔴' : '🟡';
  const formattedDeadline = this.deadline
    ? format(this.deadline, DateTimeLongFormat)
    : 'Without deadline';

  return `*${required} ${this.header || UNDEFINED_MESSAGE}*\n${subject}*Due:* ${formattedDeadline}\n\n${this.body || UNDEFINED_MESSAGE}`;
};

export { Notification };
