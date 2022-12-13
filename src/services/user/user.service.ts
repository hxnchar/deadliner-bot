import { UserModel } from 'services/user/user.model';
import { UserController } from 'services/user/user.controller';
import { Subject, SubjectController } from 'services/subject';
import { Calendar } from 'services/calendar';
import { Language } from 'consts/enums';
import IUser from './user.interface';

const NO_SUBJECTS_MSG = 'No subjects in this list yet';

class User {
  _id: number | undefined;
  _name: string | undefined = '';
  _subjects: Subject[];
  _calendar: Calendar | undefined;
  _language: Language = Language.en;

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

  convertToObject() {
    const subjects = this.subjects.map((subject) => subject.convertToObject());
    return {
      id: this.id,
      name: this.name,
      subjects,
      calendar: this.calendar,
      language: this.language,
    };
  }

  static async parse(object: IUser): Promise<User> {
    const { id, name, subjects, calendar, language } = object;
    const user = new User(id, name);
    const parsedSubjects: Subject[] = [];

    for (const subject of subjects) {
      const fetchedSubject =
        await SubjectController.getByID(subject._id?.toString());
      if (fetchedSubject) {
        parsedSubjects.push(fetchedSubject);
      }
    }

    user.subjects = parsedSubjects;
    user.language = language;

    return user;
  }

  static async subscribeUserTo(user: User, subject: Subject) {
    user.subjects.push(subject);
    await UserController.save(user);
  }
}

User.prototype.toString = function userToString() {
  //TODO set total amount of subjects by admin
  const FIXMEPLS = 3;
  const countSubjects = this.subjects.length;
  const generalSubjects =
    this.subjects.filter((subject) => subject.isGeneral)
      .map((subject) => subject.name),
        privateSubjects =
          this.subjects.filter((subject) => !subject.isGeneral)
            .map((subject) => subject.name);
  const generalSubjectsStringified = generalSubjects.length > 0 ? generalSubjects.join(',\n')
          : NO_SUBJECTS_MSG,
        privateSubjectsStringified = privateSubjects.length > 0 ? privateSubjects.join(',\n')
          : NO_SUBJECTS_MSG;
  const totalSubjectsRate = countSubjects === FIXMEPLS ? '✅'
    : countSubjects < FIXMEPLS ? '⚠️' : '🤨';
  return `*⚙️ Preferences*\n\n*${totalSubjectsRate} Total number of subjects:* ${countSubjects}/${FIXMEPLS}\n\n*👥 General subjects list:*\n${generalSubjectsStringified}\n\n*👤 Private subjects list:*\n${privateSubjectsStringified}`;
};

export { User };
