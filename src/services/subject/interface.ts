import { Types } from 'mongoose';

interface ISubject {
  _id?: Types.ObjectId;
  name?: string,
  isGeneral?: boolean,
}

export { ISubject };
