import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from '../user/user.module';
import { HashService } from './providers/hash.service';
import { BcryptService } from './providers/bcrypt.service';
import { CryptoService } from './providers/crypto.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: HashService, useClass: BcryptService },
    BcryptService,
    CryptoService,
  ],
  exports: [AuthService, { provide: HashService, useClass: BcryptService }],
})
export class AuthModule {}
