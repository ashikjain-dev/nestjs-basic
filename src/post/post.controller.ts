import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {PostService} from './providers/post.service'

@Controller('post')
export class PostController {
    constructor(private readonly postService:PostService){}
    @Get('/:userId')
    public getPosts(@Param('userId',new ParseIntPipe())userId:number):string{
        console.log(userId)
        return this.postService.findAll(userId)
    }
}
