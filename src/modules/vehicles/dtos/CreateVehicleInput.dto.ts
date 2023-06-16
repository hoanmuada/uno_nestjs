import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { VehicleType } from '../types';

@InputType()
export class CreateVehicleInputDto {
  @Field()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  licensePlates: string;

  @Field()
  @IsInt({ message: 'not int' })
  @IsPositive({ message: 'less than 0' })
  imageId: number;

  @Field()
  @IsNotEmpty({ message: 'value empty' })
  @IsString({ message: 'not string' })
  license: string;

  @Field()
  @IsInt({ message: 'not int' })
  @IsPositive({ message: 'less than 0' })
  @IsEnum(VehicleType, { message: 'wrong' })
  typeId: number;
}
