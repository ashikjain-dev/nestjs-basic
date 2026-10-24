import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from '../user/user.module';
import { HashService } from './providers/hash.service';
import { BcryptService } from './providers/bcrypt.service';
import { CryptoService } from './providers/crypto.service';
import { jwtConfig } from './config/jwt.config';
import { JWTService } from './providers/jwt.service';
import { RefreshTokenServiceTs } from './providers/refresh-token.service';
@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: HashService, useClass: BcryptService },
    BcryptService,
    CryptoService,
    JWTService,
    RefreshTokenServiceTs,
  ],
  exports: [AuthService, { provide: HashService, useClass: BcryptService }],
})
export class AuthModule {}
