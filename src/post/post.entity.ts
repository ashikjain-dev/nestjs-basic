import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { PostType, Status } from './enums/post.enum';
import { MetaOptionsDto } from './dtos/create-post.dto';
import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title!: string;
  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: 'post',
    enumName: 'posttype_enum',
  })
  postType!: PostType;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug!: string;
  @Column({
    type: 'enum',
    enum: Status,
    nullable: false,
    default: 'draft',
  })
  status!: Status;
  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn?: Date;
  
  @ManyToMany(()=>Tag,{eager:true})
  @JoinTable()
  tags?: Tag[];
  @Column({
    type: 'json',
    nullable: true,
  })
  metaOptions?: MetaOptionsDto;

  @ManyToOne(() => User, (user) => user.post)
  author!: User;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
