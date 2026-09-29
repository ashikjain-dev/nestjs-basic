import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  min,
  max,
  MinLength,
  MaxLength,
  Matches,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  firstName!: string;
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  lastName?: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
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
