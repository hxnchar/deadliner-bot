import { UserController } from 'services/user/controller';
import { Subject, SubjectController } from 'services/subject';
import { Calendar, CalendarController } from 'services/calendar';
import { Language } from 'consts/enums';
import { IUser } from 'services/user/interface';
import { BotService } from 'services/bot.service';
import { LangData } from 'consts';
import { Reminder } from 'services/reminder';

const NO_SUBJECTS_MSG = 'No subjects in this list yet';

class User {
  _id: number | undefined;
  _name: string | undefined = '';
  _subjects: Subject[];
  _calendar: Calendar | undefined;
  _language: Language = Language.en;
  _reminders: Reminder[] = [];

  constructor(id?: number, name?: string) {
    this._id = id;
    this._name = name;
    this._subjects = [];
  }

  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  get subjects() {
    return this._subjects;
  }

  set subjects(newSubjects) {
    this._subjects = newSubjects;
  }

  get calendar() {
    return this._calendar;
  }

  set calendar(newCalendar) {
    this._calendar = newCalendar;
  }

  get language() {
    return this._language;
  }

  set language(newLanguage) {
    this._language = newLanguage;
  }

  get reminders() {
    return this._reminders;
  }

  set reminders(newReminders) {
    this._reminders = newReminders;
  }

  get generalSubjects() {
    return this.subjects.filter((subject) => subject.isGeneral);
  }

  get privateSubjects() {
    return this.subjects.filter((subject) => !subject.isGeneral);
  }

  addReminder(reminder: Reminder) {
    this.reminders.push(reminder);
  }

  convertToObject() {
    const subjects = this.subjects.map((subject) => subject.convertToObject()),
          reminders = this.reminders.map((reminder) =>
            reminder.convertToObject()),
          calendar = this.calendar?.convertToObject();

    return {
      id: this.id,
      name: this.name,
      subjects,
      calendar,
      reminders,
      language: this.language,
    };
  }

  static async subscribeUserTo(user: User, subject: Subject) {
    user.subjects.push(subject);
    await UserController.save(user);
  }
}

User.prototype.toString = function userToString() {
  const LANG = BotService.language;

  //TODO set total amount of subjects by admin
  const FIXMEPLS = 3;

  const countSubjects = this.subjects.length,
        remindersCount = this.reminders.length;

  const generalSubjects = this.generalSubjects.map((subject) => subject.name),
        privateSubjects = this.privateSubjects.map((subject) => subject.name);

  const generalSubjectsStringified = generalSubjects.length > 0
    ? generalSubjects.map((subject) => `• ${subject}`).join(',\n') : NO_SUBJECTS_MSG;
  const privateSubjectsStringified = privateSubjects.length > 0
    ? privateSubjects.map((subject) => `• ${subject}`).join(',\n') : NO_SUBJECTS_MSG;

  const totalSubjectsRate = countSubjects === FIXMEPLS
    ? '✅' : countSubjects < FIXMEPLS
      ? '⚠️' : '🤨';

  const calendarTuned = this.calendar
    ? LangData[LANG]['calenadar-tuned'] : LangData[LANG]['calenadar-not-tuned'];

  return `*⚙️ Preferences*\n\n*${totalSubjectsRate} Total number of subjects:* ${countSubjects}/${FIXMEPLS}\n\n*👥 General subjects list:*\n${generalSubjectsStringified}\n\n*👤 Private subjects list:*\n${privateSubjectsStringified}\n\nCalendar: ${calendarTuned}\n\nReminders: ${remindersCount}`;
};

export { User };
