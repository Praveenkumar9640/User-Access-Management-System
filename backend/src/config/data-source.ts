import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Request } from '../entity/Request';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Request],
  migrations: [],
  subscribers: [],
});
