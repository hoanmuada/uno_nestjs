import { PrimaryGeneratedColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';

export abstract class BaseIdEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
}
