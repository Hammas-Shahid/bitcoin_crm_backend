import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { configDotenv } from 'dotenv';

configDotenv();

export const ormConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  synchronize: false,
  entities: [path.join(__dirname, '**', '*.entity.js')],
  migrations: [path.join(__dirname, '**', 'migrations', '*.js')],
};

export default new DataSource(ormConfig as DataSourceOptions);
