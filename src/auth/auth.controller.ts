import { Controller, Post,Body } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('/signin')
    public signIn(@Body()body:any){
        console.log(body)
        return this.authService.findOne()
    }
}
