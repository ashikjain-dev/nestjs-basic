import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthTokenGuard } from '../auth-guard/auth-token.guard';
import { NoauthGuard } from '../noauth/noauth.guard';
import { AuthEnum } from '../../enums/auth.enum';
import { AUTH_TYPE_KEY } from '../../constant/constant';
@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly defaultAuthType = AuthEnum.BEARER;
  private authTypeMap: Record<AuthEnum, CanActivate | CanActivate[]>;
  private readonly logger: Logger;
  constructor(
    private readonly reflector: Reflector,
    private readonly authGuard: AuthTokenGuard,
    private readonly noAuthGuard: NoauthGuard,
  ) {
    this.authTypeMap = {
      [AuthEnum.BEARER]: this.authGuard,
      [AuthEnum.NONE]: this.noAuthGuard,
    };
    this.logger = new Logger('AuthenticationGuard');
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes: AuthEnum[] = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [this.defaultAuthType];

    const guards = authTypes.map((type) => this.authTypeMap[type]).flat();
    const error = new UnauthorizedException();
    for (let inst of guards) {
      const canActivat = await Promise.resolve(inst.canActivate(context)).catch(
        (err) => {
          return false;
        },
      );

      if (canActivat) {
        return true;
      }
    }

    throw error;
  }
}
