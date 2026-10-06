import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MetaOptionService } from './providers/metaoption.service';
import {MetaOptionsDto}from '../post/dtos/create-post.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('metaoption')
export class MetaoptionController {
    private name="MetaOptionController"
    constructor(private readonly metaService:MetaOptionService,private readonly logger:Logger){}
    @ApiOperation({
      summary:"create a meta value"  
    })
    @ApiResponse({
        status:201,
        description:"meta option is created"
    })
    @Post()
    public createMeta(@Body()body:MetaOptionsDto){
        this.logger.log(`Req Body:${JSON.stringify(body)}`,`${this.name}`)
        return this.metaService.createMetaOption(body)
    }
}
