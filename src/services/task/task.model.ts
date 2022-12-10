import { Schema, model } from 'mongoose';
import { ModelName } from 'consts/enums';
import ITask from 'services/task/task.interface';
import { SubjectSchema, SubjectModel } from 'services/subject';

const TaskSchema = new Schema({
  body: { 'type': String, 'unique': false, 'required': true },
  date: { 'type': Date, 'unique': false, 'required': true },
  subject: { 'type': SubjectSchema, ref: SubjectModel, 'unique': false, 'required': true },
});

const TaskModel =
  model<ITask>(ModelName.TASK, TaskSchema);

export { TaskSchema, TaskModel };
