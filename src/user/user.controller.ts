import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get('{/:id}')
    public getUser(@Param('id') params: number | undefined, @Query('page') page: number | undefined, @Query('limit') limit: number | undefined): string {
        console.log(params)
        console.log(page, limit)
        return `All users information`
    }
}
