import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
class Database {
  uri;
  isConnected: boolean = false;
  client: MongoClient | null = null;

  constructor(uri: string) {
    this.uri = uri;
  }

  async connect() {
    await mongoose.connect(this.uri);
    this.isConnected = true;
  }

  async disconnect() {
    await mongoose.disconnect();
    this.isConnected = false;
  }
}

export { Database }
