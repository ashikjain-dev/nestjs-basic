import { Logger, Module } from '@nestjs/common';
import { AwsuploadController } from './awsupload.controller';
import { UploadService } from './providers/awsupload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsUploadEntity } from './awsupload.entity';

import { UploadToAwsService } from './providers/upload-to-aws.service';

@Module({
  imports: [TypeOrmModule.forFeature([AwsUploadEntity])],
  controllers: [AwsuploadController],
  providers: [UploadService, Logger, UploadToAwsService],
  exports: [],
})
export class AwsuploadModule {}
