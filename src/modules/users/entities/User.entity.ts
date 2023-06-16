import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../bases/Base.entity';
import { UserRole } from '../types';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', unique: true, length: 45 })
  userName: string;

  @Column({ name: 'user_pass', length: 100 })
  userPass: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  @Column({
    name: 'role_id',
    enum: UserRole,
    transformer: {
      to(value) {
        return value.toString();
      },
      from(value) {
        return +value;
      },
    },
  })
  roleId: number;
}
