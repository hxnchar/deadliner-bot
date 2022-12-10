import { User } from 'services/user/user.service';
import { UserModel } from 'services/user/user.model';
import { SubjectController } from 'services/subject';
import { BotContext } from 'bot/enviroment';

const UserController = {

  async save(user: User) {
    const userExists = await UserModel.exists({ id: user.id });
    if (userExists) {
      const subjects =
        user.subjects.map((subject) => subject.convertToObject());
      await UserModel.findOneAndUpdate({ id: user.id }, {
        name: user.name,
        subjects,
        calendar: user.calendar,
      });
      return;
    }
    const newUser = new UserModel(user.convertToObject());
    await newUser.save();
  },

  async getAll(): Promise<User[]> {
    const users = await UserModel.find();
    const parsedUsers = [];

    for (const user of users) {
      parsedUsers.push(await User.parse(user));
    }

    return parsedUsers;
  },

  async getByID(id: number | undefined): Promise<User> {
    const userExists = await this.exists(id);

    if (userExists) {
      const user = await UserModel.findOne({ id });
      return User.parse(user);
    }

    return this.create(id);
  },

  async exists(id: number | undefined): Promise<boolean> {
    const userExists = await UserModel.find({ id });

    return userExists.length > 0;
  },

  async create(id?: number | undefined, username?: string): Promise<User> {
    const user = new User(id, username);
    const generalSubjects =
      (await SubjectController.getAll()).filter((subject) => subject.isGeneral);
    user.subjects = generalSubjects;
    return user;
  },

};

export { UserController };
