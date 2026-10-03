import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHealth():{message:string,status:string}{
    return {
      message:'service is running',
      status:'ok'
    }
  }
}
