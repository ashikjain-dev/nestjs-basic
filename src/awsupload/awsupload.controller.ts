import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { UploadService } from './providers/awsupload.service';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import type { ActiveUserInterface } from '../auth/interfaces/active-user.interface';

@Controller('awsupload')
export class AwsuploadController {
  private logger!: Logger;
  constructor(private readonly awsUploadService: UploadService) {
    this.logger = new Logger('AwsUploadController');
  }
  @ApiOperation({
    summary: 'Upload a file',
  })
  @ApiHeaders([
    { name: 'Content-Type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer Tokn' },
  ])
  @UseInterceptors(FileInterceptor('file'))
  @Post('/file')
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @ActiveUser() activeUser: ActiveUserInterface,
  ) {
    return this.awsUploadService.uploadFile(file, activeUser);
  }
}
