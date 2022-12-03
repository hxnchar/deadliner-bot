import { Schema, model, Types, Document } from 'mongoose';
import SubjectModel from 'services/subject/subject.model';
import { ModelName } from 'consts/enums';
import SubjectSchema from 'services/subject/subject.schema';

const UserModel = new Schema({
  id: { 'type': Number, 'unique': true, 'required': true },
  name: { 'type': String, 'unique': false, 'required': false },
  subjects: { 'type': [SubjectSchema], ref: SubjectModel },
  calendar: { 'type': Types.ObjectId, 'unique': true, 'required': false },
});

export default model(ModelName.USER, UserModel)
