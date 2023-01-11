import { Duration, formatDuration, parseISO } from 'date-fns';
import { parse } from 'iso8601-duration';
import { IOffset, IOffsetItem } from 'services/offset/interface';
import { LangData } from 'consts';
import { BotService } from 'services/bot.service';

class Offset implements IOffset {
  _target: {
    years: IOffsetItem,
    months: IOffsetItem,
    weeks: IOffsetItem,
    days: IOffsetItem,
    hours: IOffsetItem,
    minutes: IOffsetItem,
    seconds: IOffsetItem,
  } = {
      years: { value: 0, inputting: false },
      months: { value: 0, maxValue: 12, nextIncrease: 'years', inputting: false },
      weeks: { value: 0, maxValue: 4, nextIncrease: 'months', inputting: false },
      days: { value: 0, maxValue: 7, nextIncrease: 'weeks', inputting: false },
      hours: { value: 0, maxValue: 24, nextIncrease: 'days', inputting: false },
      minutes: { value: 0, maxValue: 60, nextIncrease: 'hours', inputting: false },
      seconds: { value: 0, maxValue: 60, nextIncrease: 'minutes', inputting: false },
    };

  constructor() {
  }

  get target() {
    return this._target;
  }

  getValue(key: string) {
    return this.target[key as keyof typeof this.target].value;
  }

  setTarget(newTarget: IOffset['target']) {
    this._target = newTarget;
  }

  setValue(key: string, value: number) {
    const currentMeasure = this.target[key as keyof typeof this.target];

    if (value < 0) {
      if (currentMeasure.maxValue) {
        this.target[key as keyof typeof this.target].value =
          currentMeasure.maxValue - 1;
        return;
      }

      throw new Error('Value must be above 0');
    }

    if (value > 0) {

      if (currentMeasure.maxValue && currentMeasure.nextIncrease &&
      value >= currentMeasure.maxValue) {
        const itemToIncrease = currentMeasure.nextIncrease;

        while (value >= currentMeasure.maxValue) {
          const nextNotIncreased = this.getValue(itemToIncrease);

          this.setValue(itemToIncrease, nextNotIncreased + 1);
          value -= currentMeasure.maxValue;
        }

        this.setValue(key, value);
        return;
      }
      this.target[key as keyof typeof this.target].value = value;
    }

    this.target[key as keyof typeof this.target].value = value;
  }

  targetToArray() {
    return Array.from(Object.keys(this.target))
      .map((key) => (
        { key, value: this.target[key as keyof typeof this.target] }
      ));
  }

  resetFlag(flag: string) {
    this.target[flag as keyof typeof this.target].inputting = false;
  }

  convertToObject(): Duration {
    const finalDuration : Duration = {};
    Object.keys(this.target)
      .map((key) => {
        finalDuration[key as keyof typeof finalDuration] =
        this.target[key as keyof typeof this.target].value;
      });
    return finalDuration;
  }

  formatDuration() {
    return formatDuration(this.convertToObject());
  }

  notNull(): boolean {
    for (const key of Object.keys(this.target)) {
      if (this.target[key as keyof typeof this.target].value !== 0) {
        return true;
      }
    }

    return false;
  }

  static parse(iso8601: string) {
    const durationObject = parse(iso8601);
    const offset = new Offset();

    for (const [key, value] of Object.entries(durationObject)) {
      offset.target[key as keyof typeof offset.target] = value;
    }

    return offset;
  }

}

Offset.prototype.toString = function offsetToString() {
  const LANG = BotService.language;

  const notNullArray = this.targetToArray()
    .filter((elem) => elem.value.value > 0)
    .map((elem) => `*${LangData[LANG][elem.key]}*: ${elem.value.value}`);

  return notNullArray.join('\n');
};

export { Offset };
