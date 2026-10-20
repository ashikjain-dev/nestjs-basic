import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "../../common/pagination/dtos/pagination.dto";
import { IsDate, IsOptional } from "class-validator";

export class QueryPostDto extends PaginationDto{
    @ApiPropertyOptional({
        type:'string',
        name:'startDate',
        example:'2026-10-19T15:16:26.144Z',
        format:'date-time',
        description:'fetch documents which are created from this date'
    })
    @IsOptional()
    @IsDate()
    startDate?:Date;
    @ApiPropertyOptional({
        type:'string',
        name:'endDate',
        format:'date-time',
        example:'2026-10-19T15:16:26.144Z',
        description:'fetch documents which are created to this date'
    })
    @IsOptional()
    @IsDate()
    endDate?:Date;
}