import { Subject } from 'services/subject'

interface INotification {
  header: string,
  body: string,
  date: Date,
  deadline: Date,
  isRequired: boolean,
  subject?: Subject,
}

export default INotification;
