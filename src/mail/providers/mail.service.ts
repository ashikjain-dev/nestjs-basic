import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../user/user.entity';

@Injectable()
export class MailService {
  private readonly logger!: Logger;
  constructor(private readonly mailerService: MailerService) {
    this.logger = new Logger('MailService');
  }
  public async sendWelcomeEmail(user: User): Promise<void> {
    const result = await this.mailerService.sendMail({
      to: user.email,
      subject: `Welcom to learning mail package`,
      template: './welcome',
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: `http://localhost:3000/`,
      },
    });
    this.logger.log(`email result:${JSON.stringify(result)}`);
    return;
  }
}
