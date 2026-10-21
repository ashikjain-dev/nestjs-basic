import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashService {
  public abstract hashPassword(text: string): Promise<string>;
  public abstract comparePassword(
    text: string,
    encryptedPassword: string,
  ): Promise<boolean>;
}
