import { ApiProperty } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name!: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  slug!: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsJSON()
  @IsOptional()
  schema?: string;
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
