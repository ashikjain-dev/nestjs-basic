import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'First name of an user',
    example: 'Aman',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  firstName!: string;
  @ApiPropertyOptional({
    type: 'string',
    required: false,
    description: 'Second name of an user',
    example: 'Khan',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  lastName?: string;
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
  @MaxLength(35)
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
