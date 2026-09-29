import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../../auth/providers/auth.service";

@Injectable()
export  class UserService {
    constructor(@Inject(forwardRef(()=>AuthService))private readonly authService:AuthService){}
    public findAll(id:number|undefined,page:number,limit:number):string{
        if(id===undefined){
             return `all users information`
        }
       return `${id}:information`
    }
    public findOneById(id:number){
        return {
            id:123,
            firstName:'Ashik',
            email:'ashikjain44@gmail.com'
        }
    }
}