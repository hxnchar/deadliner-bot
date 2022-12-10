import { Schema, model } from 'mongoose';
import { ModelName } from 'consts/enums';
import IDeadline from 'services/deadline/deadline.interface';
import { SubjectSchema, SubjectModel } from 'services/subject';

const DeadlineSchema = new Schema({
  task: { 'type': String, 'unique': false, 'required': true },
  date: { 'type': Date, 'unique': false, 'required': true },
  subject: { 'type': SubjectSchema, ref: SubjectModel, 'unique': false, 'required': true },
});

const DeadlineModel =
  model<IDeadline>(ModelName.DEADLINE, DeadlineSchema);

export { DeadlineSchema, DeadlineModel };
