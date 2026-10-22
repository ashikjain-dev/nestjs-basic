import { CanActivate, ExecutionContext, Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import {jwtConfig} from '../config/jwt.config'
import * as config  from '@nestjs/config';
import { Request } from 'express';
import { REQ_USER_KEY } from '../constant/constant';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  private logger:Logger
  constructor(private readonly jwtService:JwtService,@Inject(jwtConfig.KEY)private readonly jwtConfiguration:config.ConfigType<typeof jwtConfig>){
    this.logger=new Logger('AuthGuard')
  }
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>{
    const request:Request=context.switchToHttp().getRequest()
    const token=this.extractHeaderFromRequest(request)
    if(!token){
      this.logger.error(`No token is found in the header`)
      throw new UnauthorizedException(`Token not found`)
    }
    try {
      const payload=await this.jwtService.verifyAsync(token,{
      secret:this.jwtConfiguration.secret
    })
    this.logger.log(`payload is ${JSON.stringify(payload)}`)
    request[REQ_USER_KEY]={
      id:payload.id,
      email:payload.email
    }
    return true;
    } catch (error) {
      this.logger.error(`error while verifying token:${error}`)
      throw new InternalServerErrorException(`Couln't verify the token`)
    }
    
  }
  private extractHeaderFromRequest(req:Request):string|undefined{
    const [bearer,token]=req.headers.authorization?.split(' ')??[]
    return token;
  }
}
