import { forwardRef, Injectable, Inject, Logger } from '@nestjs/common';
import { UserService } from '../../user/providers/user.service';
import { HashService } from './hash.service';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger;
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly hashService: BcryptService,
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
}
