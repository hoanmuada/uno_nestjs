import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../modules/users/entities/User.entity';
import { UserRole } from '../../modules/users/types';
import { includes } from 'lodash';

export const AuthUser = createParamDecorator(
  (roles: UserRole[], context: ExecutionContext): UserEntity => {
    const ctx = GqlExecutionContext.create(context);
    if (!ctx.getContext().req.headers.authorization)
      throw new UnauthorizedException();

    const configService = new ConfigService();
    const jwtService = new JwtService({
      secret: configService.get<string>('AT_SECRET') || 'atSecretKey',
    });

    const token = ctx.getContext().req.headers.authorization;
    const accessToken = token.replace('Bearer', '').trim();
    const user = jwtService.verify(accessToken);
    if (roles !== undefined && includes(roles, user.roleId))
      throw new HttpException(
        'You do not have permission.',
        HttpStatus.FORBIDDEN,
      );
    return user;
  },
);
