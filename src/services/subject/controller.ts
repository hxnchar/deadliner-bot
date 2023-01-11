import { SubjectModel } from 'services/subject/model';
import { Subject } from 'services/subject/service';
import { Types } from 'mongoose';

const SubjectController = {

  async save(subject: Subject) {
    const model = new SubjectModel(subject.convertToObject());
    await model.save();
  },

  async getAll(): Promise<Subject[]> {
    const models = await SubjectModel.find(),
          subjects: Subject[] = [];

    models.forEach((subject) => subjects.push(
      Subject.parse(subject),
    ));

    return subjects;
  },

  async getByID(id: string): Promise<Subject | undefined> {
    const model =
      (await SubjectModel.find({ _id: new Types.ObjectId(id) }))[0];

    if (!model) return undefined;

    return Subject.parse(model);
  },

};

export { SubjectController };
