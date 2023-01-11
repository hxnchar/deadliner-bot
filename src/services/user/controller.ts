import { User } from 'services/user/service';
import { UserModel } from 'services/user/model';
import { SubjectController } from 'services/subject';

const UserController = {

  async save(user: User) {
    const exists = await this.exists(user.id),
          object = user.convertToObject();

    if (exists) {
      await UserModel.findOneAndUpdate({ id: user.id }, object);
      return;
    }

    const model = new UserModel(object);
    await model.save();
  },

  async getAll(): Promise<User[]> {
    const models = await UserModel.find(),
          users: User[] = [];

    for (const model of models) {
      users.push(await User.parse(model));
    }

    return users;
  },

  async getByID(id: number | undefined): Promise<User> {
    const model = await UserModel.findOne({ id });

    if (!model) {
      return this.create(id);
    }

    return User.parse(model);
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
