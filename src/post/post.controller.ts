import {
  Controller,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Post,
  Logger,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { PostService } from './providers/post.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { QueryPostDto } from './dtos/query-post.dto';

@Controller('post')
export class PostController {
  private logger: Logger;
  constructor(private readonly postService: PostService) {
    this.logger = new Logger('PostController');
  }
  @Get('{/:userId}')
  @ApiOperation({
    summary: 'Get the required author posts',
  })
  @ApiParam({
    name: 'userId',
    description: 'User id required',
    required: false,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'required author posts are fetched successfully',
  })
  public getPosts(
    @Param('userId', new ParseIntPipe({ optional: true }))
    userId: number | undefined,
    @Query() query: QueryPostDto,
  ) {
    this.logger.log(query);
    return this.postService.findAll(userId, query);
  }
  @ApiOperation({
    summary: 'create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'post create successfully',
  })
  @Post()
  public createPost(@Body() body: CreatePostDto) {
    this.logger.log(body);
    return this.postService.createPost(body);
  }
  @Delete('{/:id}')
  @HttpCode(200)
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`ID of the post to delete:${id}`);
    return this.postService.deleteOne(id);
  }
}
