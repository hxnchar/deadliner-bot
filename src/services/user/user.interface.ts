import { Calendar } from 'services/calendar';
import { Subject } from 'services/subject';

interface IUser {
  id: number,
  name?: string,
  subjects: Subject[]
  calendar?: Calendar,
}

export default IUser;
