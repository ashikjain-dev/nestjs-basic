import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateManyUserDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'User',
    },
    description: 'create multiple users at a time',
    example:
      '[{\
  "firstName": "Aman",\
  "lastName": "Khan", \
   "email": "Aman@khan.com",\
  "password": "Aman@khan@123"}]',
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  createManyusers!: CreateUserDto[];
}
