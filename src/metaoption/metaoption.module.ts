import { Module } from '@nestjs/common';
import { MetaoptionController } from './metaoption.controller';

@Module({
  controllers: [MetaoptionController]
})
export class MetaoptionModule {}
