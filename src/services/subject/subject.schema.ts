import { Schema } from 'mongoose';
import ISubject from './subject.interface';

const SubjectSchema = new Schema<ISubject>({
  name: { 'type': String, 'unique': true, 'required': true },
  isGeneral: { 'type': Boolean, 'unique': false, 'required': true },
});

export default SubjectSchema;
