import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import {PostType,Status}from './enums/post.enum'
import { MetaOptionsDto } from './dtos/create-post.dto';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: 'varchar',
    length:512,
    nullable: false,
  })
  title!: string;
  @Column({
    type: 'enum',
    enum:PostType,
    nullable:false,
    default:'post',
    enumName: 'posttype_enum',
  })
  postType!: PostType;
  @Column({
    type: 'varchar',
    length:256,
    nullable: false,
    unique:true
  })
  slug!: string;
  @Column({
    type: 'enum',
    enum:Status,
    nullable:false,
    default:'draft',
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
    length:1024,
    nullable: true,
  })
  featuredImageUrl?: string;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn?: Date;
  @Column({
    type: 'simple-array',
    nullable: true,
  })
  tags?: string[];
  @Column({
    type: 'simple-array',
    nullable: true,
  })
  metaOptions?: MetaOptionsDto
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
    @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date;
}
