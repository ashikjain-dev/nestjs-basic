import { Logger, Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './providers/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';

@Module({
  controllers: [TagController],
  providers: [TagService, Logger],
  imports: [TypeOrmModule.forFeature([Tag])],
  exports: [TagService],
})
export class TagModule {}
