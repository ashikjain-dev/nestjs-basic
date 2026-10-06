import { Logger, Module } from '@nestjs/common';
import { MetaoptionController } from './metaoption.controller';
import { MetaOptionService } from './providers/metaoption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './metaoption.entity';

@Module({
  controllers: [MetaoptionController],
  providers:[MetaOptionService,Logger],
  imports:[TypeOrmModule.forFeature([MetaOption])]

})
export class MetaoptionModule {}
