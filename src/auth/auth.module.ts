import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from '../user/user.module';
import { HashService } from './providers/hash.service';
import { BcryptService } from './providers/bcrypt.service';
import { CryptoService } from './providers/crypto.service';
import { jwtConfig } from './config/jwt.config';
import { JWTService } from './providers/jwt.service';
import { RefreshTokenService } from './providers/refresh-token.service';
import { GoogleAuthController } from './controllers/google-auth.controller';
import { GoogleAuthService } from './providers/google-auth.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    { provide: HashService, useClass: BcryptService },
    BcryptService,
    CryptoService,
    JWTService,
    RefreshTokenService,
    GoogleAuthService,
  ],
  exports: [AuthService, { provide: HashService, useClass: BcryptService }],
})
export class AuthModule {}
