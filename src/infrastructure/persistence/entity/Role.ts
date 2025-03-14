import { ROLE_STATUS } from '@core/constant/role/RoleConstant';
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
import { User } from '@infrastructure/persistence/entity/User';
import { Permission } from './Permission';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false, enum: ROLE_STATUS })
  status: ROLE_STATUS;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  removedAt: Date;

  // References
  @ManyToMany(() => Permission, (permission: Permission): Role[] => permission.roles)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => User, (user: User): Role[] => user.roles, { cascade: true })
  users: User[];
}
