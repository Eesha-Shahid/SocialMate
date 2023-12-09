import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async setTransport() {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            'https://developers.google.com/oauthplayground',
        );
    
        oauth2Client.setCredentials({
          refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });
    
        const accessToken: string = await new Promise((resolve, reject) => {
          oauth2Client.getAccessToken((err, token) => {
            if (err) {
              reject('Failed to create access token :(');
            }
            resolve(token);
          });
        });
    
        const config: Options = {
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.GOOGLE_EMAIL,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            accessToken,
          },
        };
        this.mailerService.addTransporter('gmail', config);
    }

    async sendEmail(mailOptions: object) {
        try {
            await this.mailerService.sendMail(mailOptions);
            console.log('Email sent successfully');
        } 
        catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
