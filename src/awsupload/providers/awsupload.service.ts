import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AwsUploadEntity } from '../awsupload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsService } from './upload-to-aws.service';
import { ActiveUserInterface } from '../../auth/interfaces/active-user.interface';
import { supportedMiMeTypes } from '../constants/constant';
import { ConfigService } from '@nestjs/config';
import {FileTypeEnum} from '../enums/fileType.enum'
@Injectable()
export class UploadService {
  private logger!: Logger;
  constructor(
    @InjectRepository(AwsUploadEntity)
    private readonly uploadRepository: Repository<AwsUploadEntity>,
    private readonly uploadToAwsService: UploadToAwsService,
    private readonly configService:ConfigService
  ) {
    this.logger = new Logger('UploadService');
  }
  public async uploadFile(
    file: Express.Multer.File,
    activeUser: ActiveUserInterface,
  ) {
    try {
      if (!supportedMiMeTypes.includes(file.mimetype.toLocaleLowerCase())) {
        throw new BadRequestException(`Mime type is not supported`);
      }
      const result = await this.uploadToAwsService.uploadFileToAws(file);
      let newEntry = this.uploadRepository.create({
        uploadedBy: activeUser.email,
        cdnUrl: `https://${this.configService.get<string>('CLDFRONT_DOMAIN')}/${result.Key}`,
        fileName: file.originalname,
        fileSize: file.size,
        fileType: FileTypeEnum.IMAGE,
        fileMime: file.mimetype,
      });
      newEntry = await this.uploadRepository.save(newEntry);
      return newEntry;
    } catch (error) {
      this.logger.error(
        `Error:${JSON.stringify(error)}`,
      );
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(`Error while uploading a file to AWS`);
    }
  }
}
