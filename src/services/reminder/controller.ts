import { Reminder } from 'services/reminder/service';
import { ReminderModel } from 'services/reminder/model';
import { IReminder } from 'services/reminder/interface';
import { OffsetController } from 'services/offset/controller';

const UserController = {

  parse(object: IReminder): Reminder {
    const { type, offset } = object;

    if (type && offset) {
      const parsedOffset = OffsetController.parse(offset);

      return new Reminder(type, parsedOffset);
    }

    return new Reminder();
  },

  async save(reminder: Reminder) {
    const model = new ReminderModel(reminder.convertToObject());
    return model.save();
  },

  async returnSaved(reminder: Reminder): Promise<Reminder | undefined> {
    const model = await this.save(reminder);
    if (!model) return undefined;

    return this.parse(model);
  },

  async getByID(id: number | undefined): Promise<Reminder | undefined> {
    const model = await ReminderModel.findOne({ _id: id });
    if (!model) {
      return undefined;
    }

    return this.parse(model);
  },

};

export { UserController };
