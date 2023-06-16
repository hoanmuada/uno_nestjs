import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { VehicleType } from '../../vehicles/types';
import { UserRole } from '../types';

@InputType()
export class CreateUserInputDto {
  @Field()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  userName: string;

  @Field()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  @IsPhoneNumber('VI')
  phoneNumber: string;

  @Field()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  fullName: string;

  @Field()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  userPass: string;

  @Field()
  @IsInt({ message: 'not int' })
  @IsPositive({ message: 'less than 0' })
  @IsEnum(UserRole, { message: 'wrong' })
  roleId: number;
}
