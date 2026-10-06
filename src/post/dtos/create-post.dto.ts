import {
  IsArray,
  IsDate,
  IsEnum,
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
    example: ['nestjs', 'typescript', 'swagger'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @IsString({each:true})
  @MinLength(3,{each:true})
  tags?: string[];

  @ApiPropertyOptional({
    example: [{ key: 'seo_title', value: 'SEO Title' }],
    type: [Object],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({each:true})
  @Type(()=>MetaOptionsDto)
  metaOptions?: Array<MetaOptionsDto>
}

export class MetaOptionsDto{
  @IsNotEmpty()
  @IsJSON()
  metaValue!:string
}