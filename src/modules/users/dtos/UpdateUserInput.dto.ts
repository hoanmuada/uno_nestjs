import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { UserRole } from '../types';

@InputType()
export class UpdateUserInputDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  userName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  @IsPhoneNumber('VI')
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  userPass?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt({ message: 'not int' })
  @IsPositive({ message: 'less than 0' })
  @IsEnum(UserRole, { message: 'wrong' })
  roleId?: number;
}
