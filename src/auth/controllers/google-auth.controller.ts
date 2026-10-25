import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { AuthEnum } from '../enums/auth.enum';
import { GoogleAuthService } from '../providers/google-auth.service';
@Auth(AuthEnum.NONE)
@Controller('google-auth')
export class GoogleAuthController {
  private logger: Logger;
  constructor(private readonly googleAuthService: GoogleAuthService) {
    this.logger = new Logger('GoogleAuthController');
  }

  @ApiOperation({
    summary: 'verify user by using google auth token',
  })
  @Post()
  
  @HttpCode(HttpStatus.OK)
  public async verifyGoogleAuth(@Body() body: GoogleTokenDto) {
    return this.googleAuthService.googleAuthenticateService(body);
  }
}
