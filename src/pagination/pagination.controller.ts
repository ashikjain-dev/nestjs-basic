import { Controller, Logger } from '@nestjs/common';

@Controller('pagination')
export class PaginationController {
  private logger!: Logger;
  constructor() {
    this.logger = new Logger('PaginationController');
  }
}
