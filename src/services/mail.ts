import nodemailer from "nodemailer";
import { generateMailTemplate, removeHtmlTags } from "../utils/mail";

export class MailService {
  private static instance: MailService;
  private transporter: nodemailer.Transporter;

  protected constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: parseInt(process.env.SMTP_PORT ?? "", 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  public static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }

    return MailService.instance;
  }

  public async sendMail(
    name: string,
    email: string,
    message: string,
    subject = "Nouveau message de votre site"
  ): Promise<void> {
    const html = generateMailTemplate(name, email, message);
    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject,
      text: removeHtmlTags(html),
      html,
    });
  }
}
