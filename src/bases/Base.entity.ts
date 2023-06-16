import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field({nullable: true})
  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    default: null,
  })
  updatedAt: Date;
}
