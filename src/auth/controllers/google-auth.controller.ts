import { Body, Controller, Logger, Post } from '@nestjs/common';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('google-auth')
export class GoogleAuthController {
  private logger: Logger;
  constructor() {
    this.logger = new Logger('GoogleAuthController');
  }

  @ApiOperation({
    summary: 'verify user by using google auth token',
  })
  @Post()
  public async verifyGoogleAuth(@Body() body: GoogleTokenDto) {}
}
