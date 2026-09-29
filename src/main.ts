import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger'

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true
  }))
  /**
   * Swagger configuration
   */
  const config=new DocumentBuilder().setTitle('Learning Swagger API').setDescription('Base url: http://localhost:3000').setVersion('1.0').build()
  //Instantiate document
  const document=SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
