import { Injectable, Inject, Logger } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { JWTService } from './jwt.service';
import { User } from '../../user/user.entity';
import { TOKEN_TYPE } from '../constant/constant';
import { ActiveUserInterface } from '../interfaces/active-user.interface';
import { jwtConfig } from '../config/jwt.config';
import * as config from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger: Logger;
  constructor(
    private readonly hashService: BcryptService,
    private readonly jwtService: JWTService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
  ) {
    this.logger = new Logger('AuthService');
  }
  public async hashPassword(text: string): Promise<string> {
    return this.hashService.hashPassword(text);
  }
  public async comparePassword(
    text: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return this.hashService.comparePassword(text, encryptedPassword);
  }
  public async generateToken(user: User) {
    return this.jwtService.generateToken(user);
  }
  public async generateAccessAndRefreshTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signToken<Partial<ActiveUserInterface>>(
        user.id,
        this.jwtConfiguration.signOptions.expiresIn,
        { email: user.email },
      ),
      this.jwtService.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);
    const tokens = {
      access: {
        token: accessToken,
        type: TOKEN_TYPE,
        expiry: this.jwtConfiguration.signOptions.expiresIn,
      },
      refresh: {
        token: refreshToken,
        type: TOKEN_TYPE,
        expiry: this.jwtConfiguration.refreshTokenTtl,
      },
    };
    return tokens;
  }
}
