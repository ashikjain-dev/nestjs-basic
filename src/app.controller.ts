import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthEnum } from './auth/enums/auth.enum';
import { Auth } from './auth/decorators/auth.decorator';
@Controller()
@ApiTags('Health')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/health')
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
  })
  @Auth(AuthEnum.NONE)
  getHealth(): { message: string; status: string } {
    return this.appService.getHealth();
  }
}
