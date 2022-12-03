import 'dotenv/config';

interface IDatabaseConfig {
  uri: string;
}

const DB_CONFIG: IDatabaseConfig = {
  uri: process.env.DB_URI!,
};

export { DB_CONFIG };
