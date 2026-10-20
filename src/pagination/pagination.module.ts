import { Module } from '@nestjs/common';
import { PaginationController } from './pagination.controller';
import { PaginationService } from './providers/pagination.service';

@Module({
  providers: [PaginationService],
  imports: [],
  controllers: [PaginationController],
  exports: [PaginationService],
})
export class PaginationModule {}
