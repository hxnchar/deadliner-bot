import { Reminder } from './service';
import { ReminderModel } from './model';

const UserController = {

  async save(reminder: Reminder) {
    const model = new ReminderModel(reminder.convertToObject());
    await model.save();
  },

  async getByID(id: number | undefined): Promise<Reminder | undefined> {
    const model = await ReminderModel.findOne({ _id: id });
    if (!model) {
      return undefined;
    }

    return Reminder.parse(model);
  },

};

export { UserController };
