import { BeforeInsert, Column, CreateDateColumn, Entity, OneToOne } from 'typeorm';
import { BaseIdEntity } from '../../bases/BaseId.entity';
import { VehicleEntity } from '../vehicles/entities/Vehicle.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { fullImageUrl } from '../../helpers/file.helper';

@ObjectType('files')
@Entity('files')
export class FileEntity extends BaseIdEntity {
  @Field()
  @Column({ name: 'file_name' })
  fileName: string;

  @Field()
  @Column({ name: 'file_url', transformer: {
      to(value) {
        return value.toString();
      },
      from(value) {
        return fullImageUrl(value);
      },
    }, })
  fileUrl: string;

  @Field()
  @Column({ name: 'file_size' })
  fileSize: number;

  @Field()
  @Column({ name: 'mime_type' })
  mimeType: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.File)
  Vehicle: VehicleEntity;
}
