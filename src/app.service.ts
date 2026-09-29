import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHealth():{message:string,statusCode:number}{
    return {
      message:'service is running',
      statusCode:200
    }
  }
}
