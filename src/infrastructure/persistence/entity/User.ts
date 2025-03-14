import { USER_STATUS, USER_TYPE } from '@core/constant/user/UserConstant';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '@infrastructure/persistence/entity/Role';
import { Permission } from './Permission';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, enum: USER_TYPE, default: USER_TYPE.CLIENT })
  type: USER_TYPE;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: false, enum: USER_STATUS, default: USER_STATUS.INACTIVE })
  status: USER_STATUS;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lockedAt: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  removedAt: Date;

  // References
  @ManyToMany(() => Role, (role: Role): User[] => role.users)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Permission, (permission: Permission): User[] => permission.users)
  @JoinTable()
  permissions: Permission[];
}
