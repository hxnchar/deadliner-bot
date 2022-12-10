import { Subject } from 'services/subject';

interface IDeadline {
  task: string
  date: Date,
  subject: Subject,
}

export default IDeadline;
