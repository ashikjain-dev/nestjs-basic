import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import * as config from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { jwtConfig } from '../config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UserService } from '../../user/providers/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleAuthService {
  private readonly logger: Logger;
  private oAuthClient!: OAuth2Client;
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    this.logger = new Logger('GoogleAuthService');
    const clientId = this.jwtConfiguration.googleAuthClientId;
    const clientSecret = this.jwtConfiguration.googleAuthClientSecret;
    this.oAuthClient = new OAuth2Client(clientId, clientSecret);
  }
  // public async onModuleInit() {
  //   const clientId = this.jwtConfiguration.googleAuthClientId;
  //   const clientSecret = this.jwtConfiguration.googleAuthClientSecret;
  //   this.oAuthClient = new OAuth2Client(clientId, clientSecret);
  // }
  public async googleAuthenticateService(googleToken: GoogleTokenDto) {
    try {
      const loginTicket = await this.oAuthClient.verifyIdToken({
        idToken: googleToken.loginTicket,
      });
      const payload = loginTicket.getPayload();
      if (!payload) {
        throw new Error(`Invalid Google token`);
      }

      const { email, name, family_name, sub: googleId } = payload;
      this.logger.log(`user email:${email}`)
      const user = await this.userService.findOneByGoogleId(googleId);
      if (user) {
       return this.authService.generateAccessAndRefreshTokens(user);
      } else {
        const firstName = name?.split(' ')[0];

        if (firstName && email) {
          return this.userService.createGoogleUser({
            firstName,
            lastName: family_name,
            email,
            googleId
          });
        } else {
          throw new BadRequestException(
            `Couldn't able to fetch your name and email from the google account`,
          );
        }
      }
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(`Couldn't verify google token`);
    }
  }

  
}
