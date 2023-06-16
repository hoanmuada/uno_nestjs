import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { VehicleType } from '../types';

@InputType()
export class UpdateVehicleInputDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  licensePlates?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt({ message: 'not int' })
  @IsPositive({ message: 'less than 0' })
  imageId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  license?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt({ message: 'not int' })
  @IsPositive({ message: 'less than 0' })
  @IsEnum(VehicleType, { message: 'wrong' })
  typeId?: number;
}
