const undefinedMessage: string = 'Not provided';

class Subject {
  name: string | undefined = '';
  isPersonal: boolean | undefined = false;

  constructor(name?: string, isPersonal?: boolean) {
    this.name = name;
    this.isPersonal = isPersonal;
  }
}

Subject.prototype.toString = function subjectToString() {
  const accessibility =
    typeof this.isPersonal === 'undefined' ? undefinedMessage
      : this.isPersonal
        ? 'non-general' : 'general';
  return `*Name:* _${this.name || undefinedMessage}_\n*Accessibility:* ${accessibility}`;
};

export default Subject;
