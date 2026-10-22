import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Post,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './providers/user.service';
import { CreateManyUserDto } from './dtos/create-many-user.dto';
import { PaginateInterface } from '../pagination/interfaces/paginate.interface';
import { User } from './user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthTokenGuard } from '../auth/auth-guard/auth-token.guard';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}
  //{/:id}
  @ApiParam({
    name: 'id',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'all user informations',
  })
  @Get('{/:id}')
  public getUser(
    @Param('id', new ParseIntPipe({ optional: true })) id: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
  ): Promise<User | PaginateInterface<User>> {
    this.logger.log(
      `userid:${id} | page:${page} | limit:${limit}`,
      'UserController',
    );
    return this.userService.findAll(id, page, limit);
  }

  @ApiOperation({
    summary: 'Create an user',
  })
  @Post()
  public createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
  @ApiOperation({
    summary: 'create multiple users at once',
  })
  @UseGuards(AuthTokenGuard)
  @Post('/many/users')
  public creatManyUsers(@Body() body: CreateManyUserDto) {
    return this.userService.createMany(body);
  }
  @ApiOperation({
    summary: 'login to an user account',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }
}
