import { Types } from 'mongoose';
import { IReminder } from 'services/reminder/interface';
import { ReminderTypes } from 'consts/enums';

class Reminder implements IReminder {
  _id: Types.ObjectId | undefined;
  _type: ReminderTypes | undefined;
  _timeOffset: Date | undefined;

  constructor(type?: ReminderTypes, timeOffset?: Date) {
    this._type = type;
    this._timeOffset = timeOffset;
  }

  set id(newID) {
    this._id = newID;
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  set type(newType) {
    this._type = newType;
  }

  get timeOffset() {
    return this._timeOffset;
  }

  set timeOffset(newTimeOffset) {
    this._timeOffset = newTimeOffset;
  }

  convertToObject() {
    if (typeof this.type === 'undefined') {
      throw new Error('Please, provide type');
    }
    if (typeof this.timeOffset  === 'undefined') {
      throw new Error('Please, provide the time offset');
    }
    return { _id: this.id, type: this.type, timeOffset: this.timeOffset };
  }

  static convertToMap(reminders: Reminder[]): Map<ReminderTypes, Date[]>  {
    const remindersMap = new Map<ReminderTypes, Date[]>();

    for (const reminder of reminders) {
      if (!reminder.type || !reminder.timeOffset) continue;
      const currentKey = reminder.type;
      const currentOffsets = remindersMap.get(currentKey) || [];
      remindersMap.set(currentKey, [...currentOffsets, reminder.timeOffset]);
    }

    return remindersMap;
  }

  static stringify(reminders: Reminder[]): string {
    const groupedReminders = Reminder.convertToMap(reminders);
    const result: string[] = [];
    for (const [type, timeOffsets] of Object.entries(groupedReminders)) {
      result.push(`*[${type}]*\n${timeOffsets.join(',\n')}`);
    }
    return result.join('\n');
  }

}

export { Reminder };
