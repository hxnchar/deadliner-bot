import { IEvent } from 'services/event/interface';

class Event implements IEvent {
  _summary: string = '';
  _description: string = '';

  constructor(summary: string, description: string) {
    this._summary = summary;
    this._description = description;
  }

  get summary() {
    return this._summary;
  }

  set summary(newSummary) {
    this._summary = newSummary;
  }

  get description() {
    return this._description;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  convertToObject(): IEvent {
    return {
      summary: this.summary,
      description: this.description,
    };
  }
}

export { Event };
