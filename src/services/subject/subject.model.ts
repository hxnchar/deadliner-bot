import { model } from 'mongoose';
import { ModelName } from 'consts/enums';
import SubjectSchema from './subject.schema';

export default model(ModelName.SUBJECT, SubjectSchema);
