import { User } from 'services/user/service';
import { UserModel } from 'services/user/model';
import { SubjectController } from 'services/subject';
import { IUser } from 'services/user/interface';
import { CalendarController } from 'services/calendar';
import { Subject } from 'services/subject';
import { Reminder } from 'services/reminder/service';
import { ReminderController } from 'services/reminder/controller';

const UserController = {

  async parse(object: IUser): Promise<User> {
    const { id, chatID, name, subjects, calendar, language, reminders } =
      object;

    const user = new User(id, chatID, name);

    const parsedSubjects: Subject[] =
      await SubjectController.getManyByIDs(subjects);
    const parsedReminders: Reminder[] =
      await ReminderController.getManyByIDs(reminders);
    const parsedCalendar =
      await CalendarController.getByID(calendar?._id);

    user.subjects = parsedSubjects;
    user.language = language;
    user.calendar = parsedCalendar;
    user.reminders = parsedReminders;

    return user;
  },

  async save(user: User) {
    const exists = await this.exists(user.id),
          object = user.convertToObject();

    if (exists) {
      return UserModel.findOneAndUpdate(
        { id: user.id }, object, { new: true },
      );
    }

    const model = new UserModel(object);
    return model.save();
  },

  async returnSaved(user: User): Promise<User | undefined> {
    const model = await this.save(user);
    if (!model) return undefined;

    return this.parse(model);
  },

  async getAll(): Promise<User[]> {
    const models = await UserModel.find(),
          users: User[] = [];

    for (const model of models) {
      users.push(await this.parse(model));
    }

    return users;
  },

  async getAllBySubject(subject: Subject): Promise<User[]> {
    const users = await UserController.getAll();

    return subject.isGeneral
      ? users
      : users.filter((user) =>
        user.subjects.some((userSubject) => userSubject.id === subject.id));
  },

  async getByID(
    id: number | undefined,
    chatID: number | undefined,
    username: string | undefined,
  ): Promise<User> {
    const model = await UserModel.findOne({ id });

    if (!model) {
      return this.create(id, chatID, username);
    }

    return this.parse(model);
  },

  async exists(id: number | undefined): Promise<boolean> {
    return (await UserModel.find({ id })).length > 0;
  },

  async create(
    id?: number | undefined,
    chatID?: number | undefined,
    username?: string): Promise<User> {
    const user = new User(id, chatID, username);

    const generalSubjects =
      (await SubjectController.getAll()).filter((subject) => subject.isGeneral);
    user.subjects = generalSubjects;

    return user;
  },

};

export { UserController };
