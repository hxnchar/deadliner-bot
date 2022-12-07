import { User } from 'services/user/user.service';
import { UserModel } from 'services/user/user.model';
import { Subject, SubjectController } from 'services/subject';

const UserController = {

  async getAll(): Promise<User[]> {
    const users = await UserModel.find();
    const parsedUsers = [];

    for (const user of users) {
      parsedUsers.push(await User.parse(user));
    }

    return parsedUsers;
  },

  async getByID(id: number | undefined): Promise<User> {
    const userFromDB = (await UserModel.find({ id }))[0];

    if (!userFromDB) {
      const newUser = new User(id);
      const userSubjects: Subject[] = [];
      const generalSubjects =
        (await SubjectController.getAll()).filter(subject => subject.isGeneral);

      generalSubjects.forEach(subject => {
        userSubjects.push(subject);
      });

      newUser.subjects = userSubjects;
      await newUser.save();
      return newUser;
    }

    return User.parse(userFromDB);
  }
}

export { UserController };
