import { METHODS } from 'http';
import { PERMISSION_STATUS } from '@core/constant/permission/PermissionConstant';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false, enum: PERMISSION_STATUS })
  status: PERMISSION_STATUS;

  @Column({ type: 'varchar', nullable: false })
  module: string;

  @Column({ type: 'varchar', nullable: false })
  endpoint: string;

  @Column({ type: 'varchar', nullable: false, enum: METHODS })
  method: typeof METHODS;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
