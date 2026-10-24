import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserInterface } from '../interfaces/active-user.interface';
import { REQ_USER_KEY } from '../constant/constant';

export const ActiveUser = createParamDecorator(
  (data: keyof ActiveUserInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[REQ_USER_KEY];

    return data ? user[data] : user;
  },
);
