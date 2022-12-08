import 'dotenv/config';

interface ICalendarConfig {
  key: string;
}

const CALENDAR_CONFIG: ICalendarConfig = {
  key: process.env.CALENDAR_KEY!,
};

export { CALENDAR_CONFIG };
