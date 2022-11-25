enum DateFormat {
  LONG = '(EEEE) dd.MM.yyyy',
  COMMON= 'dd.MM.yyyy',
}

enum TimeFormat {
  COMMON = 'HH:mm',
}

const DateTimeCommonFormat = `${DateFormat.COMMON} ${TimeFormat.COMMON}`;
const DateTimeLongFormat = `${DateFormat.LONG}, ${TimeFormat.COMMON}`;

export { DateFormat, TimeFormat, DateTimeCommonFormat, DateTimeLongFormat }
