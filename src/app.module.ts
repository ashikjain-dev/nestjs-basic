import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { HttpLoggerMiddleware } from './middlewares/http-logger.middleware';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/tag.entity';

import Joi from './config/environment.validation';
import { jwtConfig } from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthTokenGuard } from './auth/auth-guard/auth-token.guard';
@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    TagModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV == 'development'
          ? '.env.development'
          : '.env.production',
      ],
      validationSchema: Joi,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          logging: ['info', 'log', 'error', 'schema', 'warn'],
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME') ?? 'db',
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE') ?? true,
          entities: [User, Post, Tag],
        };
      },
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  controllers: [AppController],
  providers: [AppService, Logger,{provide:APP_GUARD,useClass:AuthTokenGuard}],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
