import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleUserDto extends CreateUserDto {
  @ApiProperty({
    type: 'string',
    name: 'login ticker',
    description: 'valid google auth token',
  })
  @IsNotEmpty()
  @IsString()
  googleId!: string;
}
