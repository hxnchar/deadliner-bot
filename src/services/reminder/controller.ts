import { User } from 'services/user/service';
import { UserModel } from 'services/user/model';
import { SubjectController } from 'services/subject';
import { Reminder } from './service';
import { ReminderModel } from './model';

const UserController = {

  async save(reminder: Reminder) {
    const reminderObject = reminder.convertToObject();
    const newReminder = new ReminderModel(reminderObject);
    await newReminder.save();
  },

  async getByID(id: number | undefined): Promise<Reminder | undefined> {
    const reminder = await ReminderModel.findOne({ _id: id });
    if (!reminder) {
      return undefined;
    }

    return Reminder.parse(reminder);
  },

};

export { UserController };
