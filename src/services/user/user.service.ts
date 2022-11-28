import { Subject } from "..";

class User {
  _id: string | undefined = '';
  _tag: string | undefined = '';
  _subjects: Subject[];

  constructor(id?: string, tag?: string) {
    this._id = id;
    this._tag = tag;
    this._subjects = [];
  }

  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }

  get tag() {
    return this._tag;
  }

  set tag(newTag) {
    this._tag = newTag;
  }

  get subjects() {
    return this._subjects;
  }

  set subjects(newSubjects) {
    this._subjects = newSubjects;
  }
  
}
