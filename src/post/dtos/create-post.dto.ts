import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { PostType, Status } from '../enums/post.enum';
import { Type } from 'class-transformer';

export class MetaOptionsDto {
  @ApiProperty({ description: 'The metadata key name', example: 'theme' })
  @IsNotEmpty()
  @IsString()
  key!: string;
  @ApiProperty({
    description: 'The value can be a string, number, or boolean',
    oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
    example: 'dark',
  })
  @IsNotEmpty()
  value!: string | number | boolean;
}

export class CreatePostDto {
  @ApiProperty({
    example: 'My First Blog Post',
    description: 'Title of the post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  @MinLength(3)
  title!: string;
  @ApiProperty({
    enum: PostType,
    example: PostType.POST,
    description: 'Type of the post',
  })
  @IsNotEmpty()
  @IsEnum(PostType)
  postType!: PostType;
  @ApiPropertyOptional({
    example: 'my-first-blog-post',
    description: 'URL slug',
  })
  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  slug!: string;
  @ApiProperty({
    enum: Status,
    example: Status.DRAFT,
    description: 'Publication status',
  })
  @IsNotEmpty()
  @IsEnum(Status)
  status!: Status;
  @ApiPropertyOptional({
    example: 'This is the main body content of the post...',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  @MinLength(3)
  content?: string;
  @ApiPropertyOptional({ example: '<schema>...</schema>' })
  @IsJSON()
  @IsOptional()
  schema?: string;
  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;
  @ApiProperty({
    example: '2026-06-01T10:00:00.000Z',
    description: 'Schedule date',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  publishOn?: Date;
  @ApiPropertyOptional({
    description: 'Array of tags id',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    description: 'A single key-value metadata option',
    type: () => MetaOptionsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MetaOptionsDto)
  metaOptions?: MetaOptionsDto;
}
