import n from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
declare const transport: n.Transporter<SMTPTransport.SentMessageInfo>;
export default transport;
