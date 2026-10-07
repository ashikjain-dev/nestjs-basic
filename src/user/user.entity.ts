import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  firstName!: string;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  lastName?: string;
  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    unique: true,
  })
  @Index()
  email!: string;
  @Column({
    type: 'varchar',
    length: 35,
    nullable: false,
  })
  password!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
