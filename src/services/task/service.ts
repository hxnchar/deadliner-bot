import { Types } from 'mongoose';
import { format } from 'date-fns';
import { DateTimeLongFormat } from 'consts';
import { Subject, SubjectController } from 'services';

const UNDEFINED_MESSAGE: string = 'Not provided';

class Task {
  _id: Types.ObjectId | undefined;
  _body: string | undefined = '';
  _date: Date | undefined;
  _subject: Subject | undefined;

  set id(newID) {
    this._id = newID;
  }

  get id() {
    return this._id;
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

  get subject() {
    return this._subject;
  }

  set subject(newSubject) {
    this._subject = newSubject;
  }

  constructor(
    body?: string,
    date?: Date,
    subject?: Subject,
  ) {
    this.body = body;
    this.date = date;
    this.subject = subject;
  }

  convertToObject() {
    if (typeof this.body === 'undefined') {
      throw new Error('Please, provide body');
    }
    if (typeof this.date === 'undefined') {
      throw new Error('Please, provide date');
    }
    if (typeof this.subject === 'undefined') {
      throw new Error('Please, provide a subject');
    }
    return {
      _id: this.id,
      body: this.body,
      date: this.date,
      subject: this.subject.convertToObject(),
    };
  }

}

Task.prototype.toString = function taskToString() {
  const subjectName = !this.subject ? UNDEFINED_MESSAGE
    : this.subject.isGeneral
      ? `👥${this.subject?.name}`
      : `👤${this.subject?.name}`;
  const formattedDate = this.date
    ? format(this.date, DateTimeLongFormat)
    : UNDEFINED_MESSAGE;

  return `*[${formattedDate}]*\n${subjectName ?? UNDEFINED_MESSAGE}\n\n${this.body ?? UNDEFINED_MESSAGE}`;
};

export { Task };
