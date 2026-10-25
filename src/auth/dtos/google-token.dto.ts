import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleTokenDto {
  @ApiProperty({
    type: 'string',
    name: 'login ticker',
    description: 'valid google auth token',
  })
  @IsNotEmpty()
  @IsString()
  loginTicket!: string;
}
