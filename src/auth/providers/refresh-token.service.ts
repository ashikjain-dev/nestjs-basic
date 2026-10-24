import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JWTService } from './jwt.service';
import { RefreshTokenDto } from '../../user/dtos/refresh-token.dto';
import { UserService } from '../../user/providers/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshTokenServiceTs {
  private readonly logger!: Logger;
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService:UserService,
    private readonly authService:AuthService
  ) {
    this.logger = new Logger('RefreshTokenService');
  }
  public async getRefreshToken(token: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyToken(token.refreshToken);
      const user=await this.userService.findOneById(payload.id)
      return  this.authService.generateAccessAndRefreshTokens(user)
    } catch (error) {
      this.logger.error(
        `error while generating tokens:${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(
        `Couln't generate tokens. Try again later.`,
      );
    }
  }
}
