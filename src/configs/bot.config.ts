import 'dotenv/config';

interface IBotConfig {
  token: string
}

const BOT_CONFIG: IBotConfig = {
  token: process.env.BOT_TOKEN!,
};

export { BOT_CONFIG };
