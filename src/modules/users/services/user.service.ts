import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../bases/BaseService';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/User.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { AuthPayload } from '../dtos/AuthPayload.dto';
import * as Buffer from 'buffer';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    public repo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super(repo);
  }

  randomString = (len: number) => randomBytes(len).toString('hex');

  async genPassword(userPass: string) {
    const salt = this.randomString(8);
    const hash = await this.getHash(userPass, salt);
    return salt + '.' + hash.toString('hex');
  }

  async getHash(userPass: string, salt: string) {
    return (await scrypt(userPass, salt, 32)) as Buffer;
  }

  async comparePassword(dbPassword: string, comparePassword: string) {
    const [salt, storedHash] = dbPassword.split('.');
    const hash = await this.getHash(comparePassword, salt);
    return storedHash === hash.toString('hex');
  }

  async login(phoneNumber: string, password: string) {
    const user = await this.findBy({
      where: 'phone_number = :phoneNumber',
      params: { phoneNumber },
      findOne: true,
    });
    if (!user) throw new NotFoundException();
    const flag = await this.comparePassword(user.userPass, password);
    if (!flag) throw new BadRequestException();
    return this.genJWTWithUser(user);
  }

  async genJWTWithUser(user: UserEntity): Promise<AuthPayload> {
    const userLogin: JwtPayload = {
      id: user.id,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      roleId: user.roleId
    };
    const rtTimeOut =
      this.configService.get<string | number>('RT_TIMEOUT') || '1d';
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(userLogin, {
        secret: this.configService.get<string>('AT_SECRET') || 'atSecretKey',
        expiresIn:
          this.configService.get<string | number>('AT_TIMEOUT') || '1h',
      }),
      this.jwtService.signAsync(userLogin, {
        secret: this.configService.get<string>('RT_SECRET') || 'rtSecretKey',
        expiresIn: rtTimeOut,
      }),
    ]);
    return { accessToken, refreshToken, ...userLogin };
  }
}
