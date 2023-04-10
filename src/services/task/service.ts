import { Types } from 'mongoose';
import { format, subDays } from 'date-fns';
import schedule from 'node-schedule';
import { BotContext } from 'bot';
import { DateTimeCommonFormat, DateTimeLongFormat, LangData } from 'consts';
import { BotService, ITask, Subject } from 'services';
import { sendMessageToChat } from 'helpers';

class Task implements ITask {
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

  get mongooseObject() {
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
      deadline: this.deadline,
      subject: this.subject.convertToObject(),
    };
  }

  get deadlineDescription() {
    const formattedDate = this.deadline ? format(this.deadline, DateTimeCommonFormat) : '-';
    return `*Upcoming deadline!*\n\n${this.subject?.name}\n\n*Due:* ${formattedDate}\n\n${this.body}`;
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

  static scheduleMessages(ctx: BotContext, chatID: number, task: Task) {
    const currentDate = new Date(Date.now()),
          taskDeadline = task.deadline!,
          amountOfDays = [30, 14, 7, 3];
    amountOfDays.forEach((numberOfDays) => {
      const dtToNotify = subDays(taskDeadline, numberOfDays);
      if (currentDate < dtToNotify) {
        schedule.scheduleJob(
          dtToNotify,
          async () => {
            await sendMessageToChat(ctx, chatID, task.deadlineDescription);
          },
        );
      }
    });
  }

}

Task.prototype.toString = function taskToString() {
  const LANG = BotService.language;

  const notDefinedMessage = LangData[LANG]['not-defined'];

  const formattedDate = this.deadline
    ? format(this.deadline, DateTimeLongFormat) : notDefinedMessage;
  const subjectName = this.subject ? this.subject.shortName : notDefinedMessage;
  const deadlineBody = this.body ?? notDefinedMessage;

  return `📅 *${formattedDate}*\n🔗 ${subjectName}\n\n✏️ ${deadlineBody}`;
};

export { Task };
