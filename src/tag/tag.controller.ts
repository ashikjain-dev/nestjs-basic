import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Logger,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagService } from './providers/tag.service';

@Controller('tag')
export class TagController {
  private logger!: Logger;
  constructor(private readonly tagService: TagService) {
    this.logger = new Logger('TagController');
  }
  @ApiOperation({
    summary: 'create a new tag.',
  })
  @Post()
  public async createTag(@Body() body: CreateTagDto) {
    return this.tagService.create(body);
  }
  @ApiOperation({
    summary: 'Fetch a particular tag',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    example: 1,
  })
  @Get('/:id')
  public async getTag(@Param('id', new ParseIntPipe()) id: number) {
    this.logger.log(`id of the tag:${id}`);
    return this.tagService.findByID(id);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    default: 10,
    description: 'Number of tags',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    default: 1,
    description: 'page number of the tag list',
  })
  public async getAllTag(@Query('page') page = 1, @Query('limit') limit = 10) {
    this.logger.log(page, limit);
    return this.tagService.findAll(page, limit);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a particular tag',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
    example: 1,
  })
  public async deleteTag(@Param('id', new ParseIntPipe()) id: number) {
    return this.tagService.deleteByID(id);
  }
}
