import { Types } from 'mongoose';
import { Subject } from 'services/subject';

interface INotification {
  _id?: Types.ObjectId,
  header?: string,
  body?: string,
  deadline?: Date,
  isRequired?: boolean,
  subject?: Subject,
}

export { INotification };
