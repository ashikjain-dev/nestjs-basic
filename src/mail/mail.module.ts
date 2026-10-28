import { Global, Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter.js';
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          secure: false,
          port: config.get<string>('MAIL_PORT'),
          auth: {
            user: config.get<string>('SMTP_USER_NAME'),
            pass: config.get<string>('SMTP_USER_PASSWORD'),
          },
        },
        default: {
          from: 'Example 1 <no-reply@example.com',
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
