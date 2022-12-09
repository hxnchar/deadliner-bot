import { Schema, model } from 'mongoose';
import { ModelName } from 'consts/enums';
import ISubject from 'services/subject/subject.interface';

const SubjectSchema = new Schema({
  name: { 'type': String, 'unique': true, 'required': true },
  isGeneral: { 'type': Boolean, 'unique': false, 'required': true },
});

const SubjectModel = model<ISubject>(ModelName.SUBJECT, SubjectSchema);

export { SubjectSchema, SubjectModel };
