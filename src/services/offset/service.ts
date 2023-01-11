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

  get duration() {
    const duration : Duration = {};

    Object.keys(this.target)
      .map((key) => {
        duration[key as keyof typeof duration] =
          this.target[key as keyof typeof this.target].value;
      });

    return duration;
  }

  get notZero() {
    for (const key of Object.keys(this.target)) {
      if (this.target[key as keyof typeof this.target].value !== 0) return true;
    }

    return false;
  }

  getValue(key: string) {
    return this.target[key as keyof typeof this.target].value;
  }

  setTarget(newTarget: IOffset['target']) {
    this._target = newTarget;
  }

  setValue(key: string, value: number) {
    const measure = this.target[key as keyof typeof this.target];

    if (value < 0) {
      if (measure.maxValue) {
        this.target[key as keyof typeof this.target].value =
          measure.maxValue - 1;
        return;
      }

      throw new Error('Value must be above 0');
    }

    if (value > 0) {
      if (measure.maxValue && measure.nextIncrease &&
      value >= measure.maxValue) {
        const toIncrease = measure.nextIncrease;

        while (value >= measure.maxValue) {
          this.setValue(toIncrease, this.getValue(toIncrease) + 1);
          value -= measure.maxValue;
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

  resetInputting(flag: string) {
    this.target[flag as keyof typeof this.target].inputting = false;
  }

  formatDuration() {
    return formatDuration(this.duration);
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
