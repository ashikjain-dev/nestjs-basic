import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { HttpLoggerMiddleware } from './middlewares/http-logger.middleware';
import { User } from './user/user.entity';
@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        logging: ['info', 'log', 'error', 'schema', 'warn'],
        username: 'user1',
        password: 'password1',
        database: 'db',
        synchronize: true,
        entities: [User],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
