import { UUID } from 'bson';
import { Schema, model } from 'mongoose';
import { ModelName } from 'consts/enums';

const User = new Schema({
  _id: { 'type': String, 'unique': true, 'required': true },
  name: { 'type': String, 'unique': false, 'required': true },
  settingsID: { 'type': UUID, 'unique': true, 'required': false },
});

export default model(ModelName.USER, User);
