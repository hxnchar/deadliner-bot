import { User } from 'services/user/user.service';
import { SubjectModel } from 'services/subject/subject.model';
import { Subject } from 'services/subject/subject.service';
import { Types } from 'mongoose';

const SubjectController = {

  async getAll(): Promise<Subject[]> {
    const fetchedSubjects = await SubjectModel.find(),
    subjects: Subject[] = [];

    fetchedSubjects.forEach(subject => subjects.push(
      Subject.parse(subject)
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
  
}

export { SubjectController };
