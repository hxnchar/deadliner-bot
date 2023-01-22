import { Types } from 'mongoose';
import { ISubject } from 'services/subject/interface';
import { LangData } from 'consts/langdata.constant';
import { BotService } from 'services/bot.service';

const UNDEFINED_MESSAGE: string = 'Not provided';

class Subject implements ISubject {
  _id: Types.ObjectId | undefined;
  _name: string | undefined = '';
  _isGeneral: boolean | undefined = false;
  // eslint-disable-next-line no-use-before-define
  static history: Subject[] = [];
  static cursor: number = 0;

  set id(newID) {
    this._id = newID;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (!Subject.history[Subject.cursor]) {
      this.writeToHistory(Subject.cursor++, this);
    }
    this._name = newName;
  }

  get isGeneral() {
    return this._isGeneral;
  }

  set isGeneral(newisGeneral) {
    if (!Subject.history[Subject.cursor]) {
      this.writeToHistory(Subject.cursor++, this);
    }
    this._isGeneral = newisGeneral;
  }

  get shortName() {
    return `${this.isGeneral ? '👥' : '👤'} ${this.name}`;
  }

  get accessibility() {
    const LANG = BotService.language;

    if (typeof this.isGeneral === 'undefined') return LangData[LANG]['not-defined'];

    return this.isGeneral
      ? LangData[LANG]['subject-general'] : LangData[LANG]['subject-not-general'];
  }

  constructor(name?: string, isGeneral?: boolean) {
    this._name = name;
    this._isGeneral = isGeneral;
  }

  undo(): boolean {
    if (Subject.cursor === 0) {
      throw new Error('Previous steps not found');
    }

    this.writeToHistory(Subject.cursor--, this);

    const newSubject: Subject = Subject.history[Subject.cursor];
    if (!this.isEqualTo(newSubject)) {
      this.name = newSubject.name;
      this.isGeneral = newSubject.isGeneral;
      return true;
    }
    return false;
  }

  redo(): boolean {
    if (Subject.cursor === Subject.history.length - 1) {
      throw new Error('Forward steps not found');
    }

    this.writeToHistory(Subject.cursor++, this);

    const newSubject: Subject = Subject.history[Subject.cursor];
    if (!this.isEqualTo(newSubject)) {
      this.name = newSubject.name;
      this.isGeneral = newSubject.isGeneral;
      return true;
    }
    return false;
  }

  writeToHistory(cursor: number, subject: Subject): void {
    Subject.history[cursor] = new Subject(subject.name, subject.isGeneral);
  }

  isEqualTo(subject: Subject): boolean {
    return this.name === subject.name && this.isGeneral === subject.isGeneral;
  }

  convertToObject() {
    if (typeof this.name === 'undefined') {
      throw new Error('Please, provide name');
    }
    if (typeof this.isGeneral  === 'undefined') {
      throw new Error('Please, provide if subject is general or not');
    }

    return { _id: this.id, name: this.name, isGeneral: this.isGeneral };
  }

  static listIncludes(subjectsList: Subject[], subject: Subject): boolean {
    let result: boolean = false;
    const subjectStringified = subject.toString();

    subjectsList.forEach((subject) => {
      if (subject.toString() === subjectStringified) {
        result = true;
      }
    });

    return result;
  }

  static indexOf(subjectsList: Subject[], subject: Subject): number {
    let index = 0;
    const subjectStringified = subject.toString();

    while (index < subjectsList.length) {
      if (subjectsList[index].toString() === subjectStringified) return index;
      index += 1;
    }

    return -1;
  }

  static getRate = (goal: number, selected: number): string => {
    if (selected === goal) return '✅';
    return selected < goal ? '⚠️' : '🤨';
  };
}

Subject.prototype.toString = function subjectToString() {
  return `*Name:* ${this.name || UNDEFINED_MESSAGE}\n*Accessibility:* ${this.accessibility}`;
};

export { Subject };
