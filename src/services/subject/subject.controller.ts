import { SubjectModel } from 'services/subject/subject.model';
import { Subject } from 'services/subject/subject.service';
import { Types } from 'mongoose';

const SubjectController = {

  async save(subject: Subject) {
    const subjectModel = new SubjectModel(subject.convertToObject());
    await subjectModel.save();
  },

  async getAll(): Promise<Subject[]> {
    const fetchedSubjects = await SubjectModel.find(),
          subjects: Subject[] = [];

    fetchedSubjects.forEach((subject) => subjects.push(
      Subject.parse(subject),
    ));

    return subjects;
  },

  async getByID(id: string): Promise<Subject> {
    //TODO implement find by id
    // const fetchedSubject =
    //   (await SubjectModel.findById(id));
    const fetchedSubject =
      (await SubjectModel.find({ _id: new Types.ObjectId(id) }))[0];
    return Subject.parse(fetchedSubject);
  },

};

export { SubjectController };
