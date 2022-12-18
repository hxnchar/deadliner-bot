/* eslint-disable camelcase */
import 'dotenv/config';

interface ICalendarConfig {
  type: string;
  project_id: string;
  private_key_id: string;
  client_email: string;
}

const CALENDAR_ACCESS = JSON.parse(process.env.CALENDAR_ACCESS!);

const CALENDAR_CONFIG: ICalendarConfig = {
  type: CALENDAR_ACCESS.type,
  project_id: CALENDAR_ACCESS.project_id,
  private_key_id: CALENDAR_ACCESS.private_key,
  client_email: CALENDAR_ACCESS.client_email,
};

export { CALENDAR_CONFIG };
