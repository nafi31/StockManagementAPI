import { DataSource } from 'typeorm';

import { join } from 'path';
export const AppDataSource = new DataSource({
  type: 'mysql', // or your database type
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'StockManagement',
    entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations', '*')],
  synchronize: false,
});