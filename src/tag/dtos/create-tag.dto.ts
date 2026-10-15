import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    type: 'string',
    example: 'JavaScript',
    required: true,
    description: 'Name of the tag',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name!: string;
  @ApiProperty({
    type: 'string',
    example: 'Oldest programming language',
    required: true,
    description: 'Description of the tag',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(250)
  description!: string;
}
