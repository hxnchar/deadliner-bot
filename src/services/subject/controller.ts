import { Types } from 'mongoose';
import { SubjectModel } from 'services/subject/model';
import { Subject } from 'services/subject/service';
import { ISubject } from 'services/subject/interface';

const SubjectController = {

  parse(object: ISubject): Subject {
    const { name, isGeneral, _id } = object;

    const subject = new Subject(name, isGeneral);
    subject.id = _id;

    return subject;
  },

  async save(subject: Subject) {
    const model = new SubjectModel(subject.convertToObject());
    return model.save();
  },

  async returnSaved(subject: Subject): Promise<Subject | undefined> {
    const model = await this.save(subject);
    if (!model) return undefined;

    return this.parse(model);
  },

  async getAll(): Promise<Subject[]> {
    const models = await SubjectModel.find(),
          subjects: Subject[] = [];

    models.forEach((subject) => subjects.push(
      this.parse(subject),
    ));

    return subjects;
  },

  async getByID(id: string): Promise<Subject | undefined> {
    const model =
      (await SubjectModel.find({ _id: new Types.ObjectId(id) }))[0];

    if (!model) return undefined;

    return this.parse(model);
  },

  async getManyByIDs(objects: Subject[]): Promise<Subject[]> {
    const subjects: Subject[] = [];

    for (const object of objects) {
      if (object._id) {
        const subject: Subject | undefined =
          await SubjectController.getByID(object._id.toString());
        if (subject) subjects.push(subject);
      }
    }

    return subjects;
  },

};

export { SubjectController };
