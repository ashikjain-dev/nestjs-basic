import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

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
    length: 60,
    nullable: false,
  })
  password!: string;

  @OneToOne(() => Post, (post) => post.author)
  post!: Post[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
