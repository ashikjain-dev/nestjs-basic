import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { HashService } from './hash.service';
const scrypt = promisify(
  crypto.scrypt as (
    password: crypto.BinaryLike,
    salt: crypto.BinaryLike,
    keylen: number,
    callback: (err: Error | null, derivedKey: Buffer) => void,
  ) => void,
);
@Injectable()
export class CryptoService implements HashService {
  private logger: Logger;
  private readonly keyLength = 32;
  constructor() {
    this.logger = new Logger('CryptoService');
  }
  public async hashPassword(text: string): Promise<string> {
    try {
      const salt = crypto.randomBytes(32).toString('hex');
      const hashedPassword = await scrypt(text, salt, this.keyLength);
      return `${salt}:${hashedPassword.toString('hex')}`;
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
      const [salt, passwordStored] = hashedPassword.split(':');
      const BufferStoredPassword = Buffer.from(passwordStored, 'hex');
      const newHashedPassword = (await scrypt(
        text,
        salt,
        this.keyLength,
      )) as Buffer;
      return crypto.timingSafeEqual(BufferStoredPassword, newHashedPassword);
    } catch (error) {
      this.logger.log(`error while generating a hashedPassword:${error}`);
      throw new InternalServerErrorException('not able to hash the password');
    }
  }
}
