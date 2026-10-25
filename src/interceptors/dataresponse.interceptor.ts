import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, map } from 'rxjs';

@Injectable()
export class DataresponseInterceptor implements NestInterceptor {
  private readonly logger: Logger;
  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger('DataResponseInterceptor');
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        apiVersion: this.configService.get<string>('API_VERSION'),
        data,
      })),
    );
  }
}
