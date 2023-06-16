import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/User.entity';
import { UserService } from './services/user.service';
import { UsersResolver } from './resolvers/users.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  providers: [UserService, UsersResolver],
})
export class UserModule {}
