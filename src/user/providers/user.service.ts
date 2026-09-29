import { Injectable } from "@nestjs/common";

@Injectable()
export  class UserService {

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