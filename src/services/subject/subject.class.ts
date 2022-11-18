const UNDEFINED_MESSAGE: string = 'Not provided';

class Subject {
  _name: string | undefined = '';
  _isGeneral: boolean | undefined = false;
  // eslint-disable-next-line no-use-before-define
  static history: Subject[] = [];
  static cursor: number = 0;

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
}

Subject.prototype.toString = function subjectToString() {
  const accessibility =
    typeof this.isGeneral === 'undefined' ? UNDEFINED_MESSAGE
      : this.isGeneral
        ? 'General' : 'Non-general';
  return `*Name:* ${this.name || UNDEFINED_MESSAGE}\n*Accessibility:* ${accessibility}`;
};

export { Subject };
