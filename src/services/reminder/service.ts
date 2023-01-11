import { Types } from 'mongoose';
import { formatDuration } from 'date-fns';
import { IReminder } from 'services/reminder/interface';
import { ReminderTypes } from 'consts/enums';
import { Offset } from 'services/offset';
import { BotService } from '..';
import { LangData } from 'consts/langdata.constant';

class Reminder implements IReminder {
  _id: Types.ObjectId | undefined;
  _type: ReminderTypes | undefined;
  _timeOffset: Offset | undefined;

  constructor(type?: ReminderTypes, timeOffset?: Offset) {
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

  static parse(object: IReminder): Reminder {
    const { type, offset } = object;

    if (type && offset) {
      const parsedOffset = Offset.parse(offset);

      return new Reminder(type, parsedOffset);
    }

    return new Reminder();
  }

  convertToObject() {
    if (typeof this.type === 'undefined') {
      throw new Error('Please, provide type');
    }
    if (typeof this.timeOffset === 'undefined') {
      throw new Error('Please, provide the time offset');
    }
    return { _id: this.id, type: this.type, timeOffset: this.timeOffset };
  }

  static convertToMap(reminders: Reminder[]): Map<ReminderTypes, Offset[]>  {
    const map = new Map<ReminderTypes, Offset[]>();

    for (const reminder of reminders) {
      if (!reminder.type || !reminder.timeOffset) continue;

      const key = reminder.type;
      const offsets = map.get(key) || [];

      map.set(key, [...offsets, reminder.timeOffset]);
    }

    return map;
  }

  static stringifyList(reminders: Reminder[]): string {
    const LANG = BotService.language;

    if (reminders.length === 0) return LangData[LANG]['list-is-empty'];

    const groupedReminders = Reminder.convertToMap(reminders);
    const result: string[] = [];

    for (const reminderType of groupedReminders.keys()) {
      const offsets = groupedReminders.get(reminderType);

      if (!offsets) continue;

      result.push(`\n*${LangData[LANG][reminderType]}*\n${offsets
        .sort((a, b) => a.totalSeconds - b.totalSeconds)
        .map((offset) => offset.stringified).join(',\n')}`);
    }
    return result.join('\n');
  }

}

export { Reminder };
