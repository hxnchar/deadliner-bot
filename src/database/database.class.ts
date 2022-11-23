import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
class Database {
  uri;
  client: MongoClient | null = null;

  constructor(uri: string) {
    this.uri = uri;
  }

  connect() {
    mongoose.connect(this.uri);
  }
}

export { Database }
