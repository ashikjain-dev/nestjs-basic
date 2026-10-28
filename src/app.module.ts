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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthTokenGuard } from './auth/guards/auth-guard/auth-token.guard';
import { NoauthGuard } from './auth/guards/noauth/noauth.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { DataresponseInterceptor } from './interceptors/dataresponse.interceptor';
import { AwsUploadEntity } from './awsupload/awsupload.entity';
import { AwsuploadModule } from './awsupload/awsupload.module';
@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    TagModule,
    AwsuploadModule,
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
          entities: [User, Post, Tag, AwsUploadEntity],
        };
      },
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_INTERCEPTOR, useClass: DataresponseInterceptor },
    AuthTokenGuard,
    NoauthGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
