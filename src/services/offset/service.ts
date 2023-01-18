import { Duration, formatDuration, formatISODuration } from 'date-fns';
import * as duration from 'duration-fns';
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
  };

  constructor() {
    this._target = {
      years: { value: 0, inputting: false },
      months: { value: 0, maxValue: 12, nextIncrease: 'years', inputting: false },
      weeks: { value: 0, maxValue: 4, nextIncrease: 'months', inputting: false },
      days: { value: 0, maxValue: 7, nextIncrease: 'weeks', inputting: false },
      hours: { value: 0, maxValue: 24, nextIncrease: 'days', inputting: false },
      minutes: { value: 0, maxValue: 60, nextIncrease: 'hours', inputting: false },
      seconds: { value: 0, maxValue: 60, nextIncrease: 'minutes', inputting: false },
    };
  }

  get target() {
    return this._target;
  }

  get duration() {
    const duration: Duration = {};
    Object.keys(this.target)
      .forEach((key) => {
        const unit = this.target[key as keyof typeof this.target];

        if (unit.value && unit.value > 0) {
          duration[key as keyof typeof duration] = unit.value;
        }
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

  get stringified() {
    return `• ${this.formatDuration()}`;
  }

  get totalSeconds() {
    return duration.toSeconds(this.duration);
  }

  get ISODuration() {
    return formatISODuration(this.duration);
  }

  setTarget(newTarget: IOffset['target']) {
    this._target = newTarget;
  }

  setValue(key: string, value: number) {
    const unit = this.target[key as keyof typeof this.target];

    if (value < 0) {
      if (unit.maxValue) {
        this.target[key as keyof typeof this.target].value =
          unit.maxValue - 1;
        return;
      }

      throw new Error('Value must be above 0');
    }

    if (value > 0) {
      if (unit.maxValue && unit.nextIncrease &&
      value >= unit.maxValue) {
        const toIncrease = unit.nextIncrease;

        while (value >= unit.maxValue) {
          this.setValue(toIncrease, this.getValue(toIncrease) + 1);
          value -= unit.maxValue;
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

}

Offset.prototype.toString = function offsetToString() {
  const LANG = BotService.language;

  const notNullArray = this.targetToArray()
    .filter((elem) => elem.value.value > 0)
    .map((elem) => `*${LangData[LANG][elem.key]}*: ${elem.value.value}`);

  return notNullArray.join('\n');
};

export { Offset };
