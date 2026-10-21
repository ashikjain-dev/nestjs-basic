import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashService } from './hash.service';

@Injectable()
export class BcryptService implements HashService {
  private logger: Logger;
  private readonly saltRounds = 10;
  constructor() {
    this.logger = new Logger('BcryptService');
  }
  public async hashPassword(text: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(text, this.saltRounds);
      this.logger.log(`hashed password:${hashedPassword}`);
      return hashedPassword;
    } catch (error) {
      this.logger.log(`error while generating a hashedPassword:${error}`);
      throw new InternalServerErrorException('not able to hash the password');
    }
  }
  public async comparePassword(
    text: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const isPassword = await bcrypt.compare(text, hashedPassword);
      return isPassword;
    } catch (error) {
      this.logger.log(`error while generating a hashedPassword:${error}`);
      throw new InternalServerErrorException('not able to hash the password');
    }
  }
}
