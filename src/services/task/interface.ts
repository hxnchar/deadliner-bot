import { Subject } from 'services/subject';

interface ITask {
  body?: string
  deadline?: Date,
  subject?: Subject,
}

export { ITask };
