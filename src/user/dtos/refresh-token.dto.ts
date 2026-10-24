import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type:"string",
    name:'refreshtoken',
    description:'A valid token is required',
    nullable:false
  })
  @IsNotEmpty()
  @IsString()
  refreshToken!: string;
}
