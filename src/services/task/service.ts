import { Types } from 'mongoose';
import { format } from 'date-fns';
import { DateTimeLongFormat, LangData } from 'consts';
import { BotService, Subject, SubjectController } from 'services';

class Task {
  _id: Types.ObjectId | undefined;
  _body: string | undefined = '';
  _deadline: Date | undefined;
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

  get deadline() {
    return this._deadline;
  }

  set deadline(newDeadline) {
    this._deadline = newDeadline;
  }

  get subject() {
    return this._subject;
  }

  set subject(newSubject) {
    this._subject = newSubject;
  }

  constructor(
    body?: string,
    deadline?: Date,
    subject?: Subject,
  ) {
    this.body = body;
    this.deadline = deadline;
    this.subject = subject;
  }

  convertToObject() {
    if (typeof this.body === 'undefined') {
      throw new Error('Please, provide body');
    }
    if (typeof this.deadline === 'undefined') {
      throw new Error('Please, provide date');
    }
    if (typeof this.subject === 'undefined') {
      throw new Error('Please, provide a subject');
    }
    return {
      _id: this.id,
      body: this.body,
      date: this.deadline,
      subject: this.subject.convertToObject(),
    };
  }

}

Task.prototype.toString = function taskToString() {
  const LANG = BotService.language;

  const notDefinedMessage = LangData[LANG]['not-defined'];

  const subjectName = !this.subject ? notDefinedMessage
    : this.subject.isGeneral
      ? `👥${this.subject?.name}`
      : `👤${this.subject?.name}`;
  const formattedDate = this.deadline
    ? format(this.deadline, DateTimeLongFormat)
    : notDefinedMessage;

  return `*[${formattedDate}]*\n${subjectName ?? notDefinedMessage}\n\n${this.body ?? notDefinedMessage}`;
};

export { Task };
