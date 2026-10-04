import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('/:userId')
  @ApiOperation({
    description: 'Get the required author posts',
  })
  @ApiParam({
    name: 'userId',
    description: 'User id required',
    required: true,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'required author posts are fetched successfully',
  })
  public getPosts(@Param('userId', new ParseIntPipe()) userId: number): string {
    console.log(userId);
    return this.postService.findAll(userId);
  }
}
