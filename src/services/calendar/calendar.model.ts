import { Schema, model, Types } from 'mongoose';
import { ModelName } from 'consts/enums';

const CalendarModel = new Schema({
  id: String,
});

export default model(ModelName.CALENDAR, CalendarModel);
