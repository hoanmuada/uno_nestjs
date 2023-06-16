import { registerAs } from '@nestjs/config';

export const MYSQL_CONFIG_NAME = 'mysql';

export enum MYSQL_MODE {
  REPLICATION = 'REPLICATION',
  SINGLE = 'SINGLE',
}

export default registerAs(MYSQL_CONFIG_NAME, () => ({
  MYSQL_MODE: process.env.MYSQL_MODE,

  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASS: process.env.MYSQL_PASS,
  MYSQL_DB: process.env.MYSQL_DB,

  MYSQL_HOST_1: process.env.MYSQL_HOST_1,
  MYSQL_PORT_1: process.env.MYSQL_PORT_1,
  MYSQL_USER_1: process.env.MYSQL_USER_1,
  MYSQL_PASS_1: process.env.MYSQL_PASS_1,
  MYSQL_DB_1: process.env.MYSQL_DB_1,

  MYSQL_HOST_2: process.env.MYSQL_HOST_2,
  MYSQL_PORT_2: process.env.MYSQL_PORT_2,
  MYSQL_USER_2: process.env.MYSQL_USER_2,
  MYSQL_PASS_2: process.env.MYSQL_PASS_2,
  MYSQL_DB_2: process.env.MYSQL_DB_2,
}));
