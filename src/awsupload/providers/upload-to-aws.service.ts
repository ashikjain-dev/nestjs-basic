import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadToAwsService {
  private readonly logger!: Logger;
  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger('UploadToAwsService');
  }
  public async uploadFileToAws(file: Express.Multer.File) {
    try {
      const s3 = new S3({
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
  secretAccessKey: this.configService.get<string>('AWS_ACCESS_SECRET_KEY'),
  region: this.configService.get<string>('AWS_S3_BUCKET_REGION'),

      });
      this.logger.log(`bucketname:${this.configService.get<string>('AWS_PUBLIC_S3_BUCKET_NAME')}`)
      const uploadResult = await s3
        .upload({
        
          Bucket:
            this.configService.get<string>('AWS_PUBLIC_S3_BUCKET_NAME') ?? '',
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();
      this.logger.log(`Result from the aws s3 bucket upload:${JSON.stringify(uploadResult)}`);
      return uploadResult;
    } catch (error) {
      this.logger.error(
        `error while uploading to aws bucket :${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(
        'Error while uploading a file to Aws bucket',
      );
    }
  }

  private generateFileName(file: Express.Multer.File): string {
    try {
      const fileName = file.originalname
        .split('.')[0]
        .replace(/\s/g, '')
        .trim();
      const fileType = file.mimetype;
      const now = new Date().getTime();
      const uniqueName = `${fileName}:${now}.${fileType}`;
      this.logger.log(`unique file name is :${uniqueName}`);
      return uniqueName;
    } catch (error) {
      this.logger.error(
        `error while generting a unique file name:${JSON.stringify(error)}`,
      );
      return ``;
    }
  }
}
