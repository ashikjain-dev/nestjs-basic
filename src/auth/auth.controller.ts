import {
  Controller,
  Post,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { RefreshTokenServiceTs } from './providers/refresh-token.service';
import { RefreshTokenDto } from '../user/dtos/refresh-token.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthEnum } from './enums/auth.enum';
import { ApiOperation } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  private readonly logger!: Logger;
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenServiceTs,
  ) {
    this.logger = new Logger('AuthController');
  }
  @ApiOperation({
    summary:'get both refresh and access token by using a valid token.'
  })
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthEnum.NONE)
  public async refreshToken(@Body() body: RefreshTokenDto) {
    return this.refreshTokenService.getRefreshToken(body);
  }
}
