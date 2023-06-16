import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../bases/Base.entity';
import { VehicleType } from '../types';
import { Field, ObjectType } from '@nestjs/graphql';
import { FileEntity } from '../../files/File.entity';

@ObjectType('vehicles')
@Entity('vehicles')
export class VehicleEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ name: 'license_plates' })
  licensePlates: string;

  @Field()
  @Column({ name: 'image_id' })
  imageId: number;

  @Field()
  @Column()
  license: string;

  @Field()
  @Column({
    name: 'type_id',
    enum: VehicleType,
    transformer: {
      to(value) {
        return value.toString();
      },
      from(value) {
        return +value;
      },
    },
  })
  typeId: number;

  @Field(() => FileEntity)
  @OneToOne(() => FileEntity, (file) => file.Vehicle)
  @JoinColumn({ name: 'image_id' })
  File: FileEntity;
}
