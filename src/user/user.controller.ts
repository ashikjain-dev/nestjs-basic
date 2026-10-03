import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Post,
  Body,
  Logger
} from '@nestjs/common';
import {ApiParam, ApiQuery, ApiResponse} from '@nestjs/swagger'
import {CreateUserDto} from './dtos/create-user.dto'
import {UserService} from './providers/user.service'
@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService,private readonly logger:Logger){}
  //{/:id}
  @ApiParam({
    name:'id',
    required:false,
    type:Number,
    example:10
  })
  @ApiQuery({
    name:'page',
    required:false,
    example:1
  })
  @ApiQuery({
    name:'limit',
    required:false,
    example:10
  })
  @ApiResponse({
    status:200,
    description:'all user informations'
  })
  @Get('{/:id}')
  public getUser(
    @Param('id', new ParseIntPipe({optional:true})) id: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number ,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number ,
  ): string {
    this.logger.log(`userid:${id} | page:${page} | limit:${limit}`,'UserController')
    return this.userService.findAll(id,page,limit)
  }

  @Post()
  public saveUser(@Body()body:CreateUserDto):string{
    
    console.log(body)
    return `user is saved successfully`

  }
}
