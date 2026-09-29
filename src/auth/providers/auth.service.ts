import { forwardRef, Injectable,Inject } from '@nestjs/common';
import { UserService } from '../../user/providers/user.service';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(()=>UserService))private readonly userService:UserService){}
    public findOne(){
        return `sign in is successful`
    }
}
