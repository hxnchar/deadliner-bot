import { Schema, model, Types } from 'mongoose';
import { ModelName } from 'consts/enums';
import { ITask } from 'services/task/interface';

const TaskSchema = new Schema({
  body: { 'type': String, 'unique': false, 'required': true },
  deadline: { 'type': Date, 'unique': false, 'required': true },
  subject: { 'type': Types.ObjectId, ref: ModelName.SUBJECT, 'unique': false, 'required': true },
});

const TaskModel =
  model<ITask>(ModelName.TASK, TaskSchema);

export { TaskSchema, TaskModel };
