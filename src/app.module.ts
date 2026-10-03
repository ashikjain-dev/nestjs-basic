import { Module,Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import {HttpLoggerMiddleware}from './middlewares/http-logger.middleware'

@Module({
  imports: [UserModule, PostModule,AuthModule],
  controllers: [AppController],
  providers: [AppService,Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*')
  }
}
