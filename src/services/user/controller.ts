import { User } from 'services/user/service';
import { UserModel } from 'services/user/model';
import { SubjectController } from 'services/subject';
import { BotContext } from 'bot/enviroment';

const UserController = {

  async save(user: User) {
    const userExists = await this.exists(user.id);
    const userObject = user.convertToObject();
    if (userExists) {
      await UserModel.findOneAndUpdate({ id: user.id }, userObject);
      return;
    }
    const newUser = new UserModel(userObject);
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
    const user = await UserModel.findOne({ id });
    if (!user) {
      return this.create(id);
    }

    return User.parse(user);
  },

  async exists(id: number | undefined): Promise<boolean> {
    return (await UserModel.find({ id })).length > 0;
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
