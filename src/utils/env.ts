import * as dotenv from 'dotenv';

const envFile = process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env';
dotenv.config({ path: envFile });


export const ENV = {
  BASE_URL: process.env.BASE_URL ?? '',
  USERNAME: process.env.USERNAME ?? '',
  PASSWORD: process.env.PASSWORD ?? '',
  ENV_NAME: process.env.ENV_NAME ?? 'local',
};