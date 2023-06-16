import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import mysqlConfig, { MYSQL_CONFIG_NAME, MYSQL_MODE } from './db.conf';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const mysql =
      this.configService.get<ConfigType<typeof mysqlConfig>>(MYSQL_CONFIG_NAME);
    if (mysql.MYSQL_MODE === MYSQL_MODE.REPLICATION) {
      return {
        type: 'mysql',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: false,
        timezone: 'Asia/Ho_Chi_Minh',
        keepConnectionAlive: true,
        replication: {
          master: {
            host: mysql.MYSQL_HOST || '127.0.0.1',
            port: parseInt(mysql.MYSQL_PORT) || 3308,
            username: mysql.MYSQL_USER || 'root',
            password: mysql.MYSQL_PASS || '',
            database: mysql.MYSQL_DB || 'uno_test',
          },
          slaves: [
            {
              host: mysql.MYSQL_HOST_1 || '127.0.0.1',
              port: parseInt(mysql.MYSQL_PORT_1) || 3308,
              username: mysql.MYSQL_USER_1 || 'root',
              password: mysql.MYSQL_PASS_1 || '',
              database: mysql.MYSQL_DB_1 || 'uno_test',
            },
            {
              host: mysql.MYSQL_HOST_2 || '127.0.0.1',
              port: parseInt(mysql.MYSQL_PORT_2) || 3308,
              username: mysql.MYSQL_USER_2 || 'root',
              password: mysql.MYSQL_PASS_2 || '',
              database: mysql.MYSQL_DB_2 || 'uno_test',
            },
          ],
        },
      };
    } else {
      return {
        type: 'mysql',
        host: mysql.MYSQL_HOST || '127.0.0.1',
        port: parseInt(mysql.MYSQL_PORT) || 3308,
        username: mysql.MYSQL_USER || 'root',
        password: mysql.MYSQL_PASS || '',
        database: mysql.MYSQL_DB || 'uno_test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: false,
        timezone: 'Asia/Ho_Chi_Minh',
        keepConnectionAlive: true,
      };
    }
  }
}
