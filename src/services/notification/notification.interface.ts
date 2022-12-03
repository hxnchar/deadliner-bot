import { Types } from 'mongoose';

interface INotification {
  header: string,
  body: string,
  date: Date,
  deadline: Date,
  isRequired: boolean,
  subjectID: Types.ObjectId,
}

export default INotification;
