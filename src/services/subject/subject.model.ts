import { Schema, model } from 'mongoose';
import { ModelName } from 'consts/enums';

const SubjectModel = new Schema({
  name: { 'type': String, 'unique': true, 'required': true },
  isGeneral: { 'type': Boolean, 'unique': false, 'required': true },
});

export default model(ModelName.SUBJECT, SubjectModel);
