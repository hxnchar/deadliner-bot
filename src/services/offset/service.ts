import { IOffset } from 'services/offset/interface';

class Offset implements IOffset {
  _years: number = 0;
  _months: number = 0;
  _weeks: number = 0;
  _days: number = 0;
  _hours: number = 0;
  _minutes: number = 0;
  _seconds: number = 0;

  get years() {
    return this._years;
  }

  set years(newYears) {
    this._years = newYears;
  }

  get months() {
    return this._months;
  }

  set months(newMonths) {
    this._months = newMonths;
  }

  get weeks() {
    return this._weeks;
  }

  set weeks(newWeeks) {
    this._weeks = newWeeks;
  }

  get days() {
    return this._days;
  }

  set days(newDays) {
    this._days = newDays;
  }

  get hours() {
    return this._hours;
  }

  set hours(newHours) {
    this._hours = newHours;
  }

  get minutes() {
    return this._minutes;
  }

  set minutes(newMinutes) {
    this._minutes = newMinutes;
  }

  get seconds() {
    return this._seconds;
  }

  set seconds(newSeconds) {
    this._seconds = newSeconds;
  }

  convertToObject(): IOffset {
    return {
      years: this.years,
      months: this.months,
      weeks: this.weeks,
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }
}

export { Offset };
