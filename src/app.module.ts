import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(process.env.NODE_ENV);
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
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
