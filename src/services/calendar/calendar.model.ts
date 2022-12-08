import { Schema, model } from 'mongoose';
import { ModelName } from 'consts/enums';

const CalendarModel = new Schema({
  id: String,
});

export default model(ModelName.CALENDAR, CalendarModel);
