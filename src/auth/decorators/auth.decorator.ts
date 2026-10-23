import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constant/constant';
import { AuthEnum } from '../enums/auth.enum';
export const Auth = (...authEnum: AuthEnum[]) =>
  SetMetadata(AUTH_TYPE_KEY, authEnum);
