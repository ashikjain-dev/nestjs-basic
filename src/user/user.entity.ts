import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Exclude } from 'class-transformer';

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
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Exclude()
  googleId?: string;

  @OneToOne(() => Post, (post) => post.author)
  post!: Post[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updatedAt!: Date;
}
