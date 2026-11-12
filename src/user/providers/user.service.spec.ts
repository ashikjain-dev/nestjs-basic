import {Test,TestingModule} from '@nestjs/testing'
import {UserService} from './user.service'
describe('UserService',()=>{
    let userService:UserService|undefined=undefined;
    beforeEach(async()=>{
        const module:TestingModule=await Test.createTestingModule({
            providers:[UserService]

        }).compile();
        userService=module.get<UserService>(UserService)
    })
    it('UserService should be defined',()=>{
        expect(userService).toBeDefined()
    })
})