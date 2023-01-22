import { Language } from 'consts/enums';
import { Calendar } from 'services/calendar';
import { Subject } from 'services/subject';
import { Reminder } from 'services/reminder';

interface IUser {
  id?: number,
  name?: string,
  subjects: Subject[]
  calendar?: Calendar,
  language: Language,
  reminders: Reminder[],
}

export { IUser };
