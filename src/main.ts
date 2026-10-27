import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {config} from 'aws-sdk'
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({ prefix: 'intro' }),
  });
  app.enableCors({
    methods: ['POST'],
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3005',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  /**
   * Swagger configuration
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Learning Swagger API')
    .setDescription('Base url: http://localhost:3000')
    .setVersion('1.0')
    .build();
  //Instantiate document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const configService=app.get(ConfigService)
  config.update({
    credentials:{
      accessKeyId:configService.get<string>("appConfig.awsAccessKeyID")??'',
      secretAccessKey:configService.get<string>("apConfig.awsAccessSecretKey")??''
    },
    region:configService.get<string>("awsS3BucketRegion")??''
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
