import { logErrorToFile, logSuccessToFile } from '@lib/logger.server';
import nodemailer from 'nodemailer';


export async function send_mail(to, subject, text, html, attachFiles = []) {

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: 'mark.roman@pcmc.gov.ph',
                pass: 'kzlfpygmqoziynim', // Consider using env vars for security
            },
        });

        const mailOptions = {
            from: '"pcmc-notification" <mark.roman@pcmc.gov.ph>',
            to,
            subject,
            text,
            html,
            attachments: (attachFiles.length > 0) ? attachFiles : []
            // attachments: [
            //     {
            //         filename: 'report.pdf',
            //         content: pdfBuffer,
            //         contentType: 'application/pdf',
            //     },
            // ],
        };

        const info = await transporter.sendMail(mailOptions);

        logSuccessToFile(`Email sent to ${to} with subject "${subject}". Message ID: ${info.messageId}`, 'send-email');

        return {
            success: true,
            messageId: info.messageId
        }

    } catch (error) {
        logErrorToFile(error, 'send-email');

        return {
            success: false,
            error: error.message
        }
    }
}
