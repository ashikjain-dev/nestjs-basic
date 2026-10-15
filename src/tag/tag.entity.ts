import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
  })
  @Index({
    background: true,
  })
  name!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 250,
  })
  description!: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
  @CreateDateColumn({
    type: 'timestamptz',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
