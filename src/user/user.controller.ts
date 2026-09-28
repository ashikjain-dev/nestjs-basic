import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Post,
  Body,
  ValidationPipe
} from '@nestjs/common';
import {CreateUserDto} from './dtos/create-user.dto'
@Controller('user')
export class UserController {
  //{/:id}
  @Get('{/:id}')
  public getUser(
    @Param('id', new ParseIntPipe({optional:true})) id: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number | undefined,
  ): string {
    console.log(`id is :${id}`);
    console.log(`page is: ${page}`);
    console.log(`limit is :${limit}`);
    return `All users information`;
  }

  @Post()
  public saveUser(@Body()body:CreateUserDto):string{
    
    console.log(body)
    return `user is saved successfully`

  }
}
