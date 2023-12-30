import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
    private readonly resendApiKey = this.configService.get<string>('RESEND_API_KEY', '');
    private readonly resend = new Resend(this.resendApiKey);
    private readonly fromEmail = 'onboarding@resend.dev';

    constructor(private readonly configService: ConfigService) {}

    async sendMail(to: string, subject: string, html: string, from?: string): Promise<void> {
        try {
            await this.resend.emails.send({
                from: from || this.fromEmail,
                to: to,
                subject: subject,
                html: html,
            });
        } catch (error: any) {
            console.error(error);
        }
    }
}
