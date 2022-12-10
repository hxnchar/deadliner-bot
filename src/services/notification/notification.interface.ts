import { Types } from 'mongoose';
import { Subject } from 'services/subject';

interface INotification {
  _id: Types.ObjectId,
  header: string,
  body: string,
  date: Date,
  deadline: Date,
  isRequired: boolean,
  subject?: Subject,
}

export default INotification;
