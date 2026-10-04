import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    @MinLength(3)
    title!:string
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    @MinLength(3)
    description!:string
    @IsString()
    @IsNotEmpty()
    url?:string

}