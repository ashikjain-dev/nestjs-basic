import { ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    type: 'number',
    name: 'page',
    default: 1,
    example: 1,
    description: 'set how many records to skip',
  })
  @IsPositive()
  @IsOptional()
  page?: number = 1;
  @ApiPropertyOptional({
    type: 'number',
    name: 'limit',
    default: 10,
    example: 10,
    description: 'set how many records to fetch',
  })
  @IsOptional()
  @IsPositive()
  limit?: number = 10;
}
