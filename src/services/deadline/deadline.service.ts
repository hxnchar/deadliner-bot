import { format } from 'date-fns';
import { DateTimeLongFormat } from 'consts';
import { Subject } from 'services';

const UNDEFINED_MESSAGE: string = 'Not provided';

class Deadline {
  _task: string | undefined = '';
  _date: Date | undefined;
  _subject: Subject | undefined;

  get task() {
    return this._task;
  }

  set task(newTask) {
    this._task = newTask;
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
    task?: string,
    date?: Date,
    subject?: Subject,
  ) {
    this.task = task;
    this.date = date;
    this.subject = subject;
  }

  convertToObject() {
    if (typeof this.task === 'undefined') {
      throw new Error('Please, provide task');
    }
    if (typeof this.date === 'undefined') {
      throw new Error('Please, provide date');
    }
    if (typeof this.subject === 'undefined') {
      throw new Error('Please, provide a subject');
    }
    return {
      task: this.task,
      date: this.date,
      subject: this.subject.convertToObject(),
    };
  }

}

Deadline.prototype.toString = function notificationToString() {
  const subjectName = !this.subject ? UNDEFINED_MESSAGE
    : this.subject.isGeneral
      ? `👥${this.subject?.name}`
      : `👤${this.subject?.name}`;
  const formattedDate = this.date
    ? format(this.date, DateTimeLongFormat)
    : UNDEFINED_MESSAGE;
  return `*[${formattedDate}]*\n${subjectName ?? UNDEFINED_MESSAGE}\n\n${this.task ?? UNDEFINED_MESSAGE}`;
};

export { Deadline };
