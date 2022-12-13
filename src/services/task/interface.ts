import { Subject } from 'services/subject';

interface ITask {
  body: string
  date: Date,
  subject: Subject,
}

export { ITask };
