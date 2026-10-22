import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Email of an user',
    example: 'Aman@khan.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Password of an user',
    example: 'Aman@khan@123',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    },
    {
      message:
        'Password must be at least 10 characters long and contain 2 numbers.',
    },
  )
  password!: string;
}
