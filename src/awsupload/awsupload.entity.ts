import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileTypeEnum } from './enums/fileType.enum';
@Entity({
  name: 'uploadHistory',
  orderBy: { createdAt: 'DESC' },
})
export class AwsUploadEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 254,
  })
  @Index()
  uploadedBy!: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  cdnUrl!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 254,
  })
  fileName!: string;
  @Column({
    type: 'float',
    nullable: false,
  })
  fileSize!: number;
  @Column({
    type: 'enum',
    default: FileTypeEnum.IMAGE,
    enum: FileTypeEnum,
  })
  fileType!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 108,
  })
  fileMime!: string;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
