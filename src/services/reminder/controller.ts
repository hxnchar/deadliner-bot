import { Reminder } from 'services/reminder/service';
import { ReminderModel } from 'services/reminder/model';
import { IReminder } from 'services/reminder/interface';
import { OffsetController } from 'services/offset/controller';

const ReminderController = {

  parse(object: IReminder): Reminder {
    const { type, offset, _id } = object;

    const parsedOffset = offset ? OffsetController.parse(offset) : undefined;
    const reminder = new Reminder(type, parsedOffset);
    reminder.id = _id;

    return reminder;
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

  async getByID(id: number | string | undefined)
  : Promise<Reminder | undefined> {
    const model = await ReminderModel.findOne({ _id: id });
    if (!model) {
      return undefined;
    }

    return this.parse(model);
  },

  async getManyByIDs(objects: Reminder[]): Promise<Reminder[]> {
    const reminders: Reminder[] = [];

    for (const object of objects) {
      if (object._id) {
        const reminder: Reminder | undefined =
          await this.getByID(object._id.toString());
        if (reminder) reminders.push(reminder);
      }
    }

    return reminders;
  },

};

export { ReminderController };
