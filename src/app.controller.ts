import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller()
@ApiTags('Health')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/health')
  @ApiResponse({
    status: 200, 
    description: 'Service is healthy'
  })
  getHealth():{message:string,status:string}{
    return this.appService.getHealth()
  }
}
