import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
  }

  createTransporter() {
    const emailConfig = {
      gmail: {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      },
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      },
      test: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'ethereal.user@ethereal.email',
          pass: 'ethereal.pass'
        }
      }
    };

    const provider = process.env.EMAIL_PROVIDER || 'gmail';
    const config = emailConfig[provider];

    if (!config) {
      console.warn(`Provider email '${provider}' non reconnu, utilisation du mode Gmail`);
      return nodemailer.createTransport(emailConfig.gmail);
    }

    return nodemailer.createTransport(config);
  }

  async sendContactNotification(contactData) {
    try {
      const { name, email, phone, subject, message, propertyInterest, timestamp } = contactData;

      // Email à l'administrateur
      const adminEmailOptions = {
        from: process.env.EMAIL_FROM || process.env.GMAIL_USER || 'loire.et.nature.conciergerie@gmail.com',
        to: process.env.ADMIN_EMAIL || 'loire.et.nature.conciergerie@gmail.com',
        subject: `[Site Web] Nouveau message: ${subject}`,
        html: this.generateAdminNotificationHTML({
          name,
          email,
          phone,
          subject,
          message,
          propertyInterest,
          timestamp
        })
      };

      // Email de confirmation au client
      const clientEmailOptions = {
        from: process.env.EMAIL_FROM || process.env.GMAIL_USER || 'loire.et.nature.conciergerie@gmail.com',
        to: email,
        subject: 'Confirmation de réception - Loire & Nature Conciergerie',
        html: this.generateClientConfirmationHTML({
          name,
          subject,
          timestamp
        })
      };

      const [adminResult, clientResult] = await Promise.all([
        this.transporter.sendMail(adminEmailOptions),
        this.transporter.sendMail(clientEmailOptions)
      ]);

      console.log('📧 Emails envoyés avec succès:', {
        adminMessageId: adminResult.messageId,
        clientMessageId: clientResult.messageId
      });

      return {
        success: true,
        adminMessageId: adminResult.messageId,
        clientMessageId: clientResult.messageId
      };

    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi des emails:', error);
      throw new Error('Erreur lors de l\'envoi des notifications email');
    }
  }

  generateAdminNotificationHTML({ name, email, phone, subject, message, propertyInterest, timestamp }) {
    const formattedDate = new Date(timestamp).toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris'
    });

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0C513A; color: white; padding: 20px; text-align: center; }
            .content { background-color: #FFF1F1; padding: 20px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #0C513A; }
            .message-content { background-color: white; padding: 15px; border-left: 4px solid #0C513A; margin-top: 10px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="font-family: 'Garamond', serif; font-style: italic; font-weight: bold;">Loire & Nature Conciergerie</h1>
              <p>Nouveau message depuis le site web</p>
            </div>
            
            <div class="content">
              <div class="field">
                <strong>Date de réception :</strong> ${formattedDate}
              </div>
              
              <div class="field">
                <strong>Nom :</strong> ${name}
              </div>
              
              <div class="field">
                <strong>Email :</strong> <a href="mailto:${email}" style="color: #0C513A;">${email}</a>
              </div>
              
              ${phone ? `
              <div class="field">
                <strong>Téléphone :</strong> <a href="tel:${phone}" style="color: #0C513A;">${phone}</a>
              </div>
              ` : ''}
              
              <div class="field">
                <strong>Sujet :</strong> ${subject}
              </div>
              
              ${propertyInterest ? `
              <div class="field">
                <strong>Propriété d'intérêt :</strong> ${propertyInterest}
              </div>
              ` : ''}
              
              <div class="field">
                <strong>Message :</strong>
                <div class="message-content">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>Ce message a été envoyé depuis le formulaire de contact du site web Loire & Nature Conciergerie</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  generateClientConfirmationHTML({ name, subject, timestamp }) {
    const formattedDate = new Date(timestamp).toLocaleDateString('fr-FR', {
      timeZone: 'Europe/Paris'
    });

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0C513A; color: white; padding: 20px; text-align: center; }
            .content { background-color: #FFF1F1; padding: 20px; }
            .highlight { background-color: #C6A462; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .contact-info { background-color: white; padding: 15px; margin-top: 20px; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="font-family: 'Garamond', serif; font-style: italic; font-weight: bold;">Loire & Nature Conciergerie</h1>
              <p>Confirmation de réception</p>
            </div>
            
            <div class="content">
              <p>Bonjour ${name},</p>
              
              <p>Nous avons bien reçu votre message concernant "<strong>${subject}</strong>" le ${formattedDate}.</p>
              
              <div class="highlight">
                <h3>📧 Votre message a été transmis à notre équipe</h3>
              </div>
              
              <p>En attendant notre réponse, n'hésitez pas à consulter notre site web pour découvrir nos services ou nous contacter directement :</p>
              
              <div class="contact-info">
                <h4 style="color: #0C513A;">Nos coordonnées</h4>
                <p>
                  <strong>📞 Téléphone :</strong> 07 43 53 53 31<br>
                  <strong>📧 Email :</strong> loire.et.nature.conciergerie@gmail.com<br>
                </p>
              </div>
              
              <p>Merci de votre confiance !</p>
              
              <p>
                Cordialement,<br>
                <strong>L'équipe Loire & Nature Conciergerie</strong>
              </p>
            </div>
            
            <div class="footer">
              <p>Loire & Nature Conciergerie</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  async testEmailConfiguration() {
    try {
      const testResult = await this.transporter.verify();
      console.log('✅ Configuration email valide:', testResult);
      return true;
    } catch (error) {
      console.error('❌ Configuration email invalide:', error.message);
      return false;
    }
  }

  async sendTestEmail(toEmail) {
    try {
      const testEmailOptions = {
        from: process.env.EMAIL_FROM || process.env.GMAIL_USER || 'loire.et.nature.conciergerie@gmail.com',
        to: toEmail,
        subject: 'Test - Loire & Nature Conciergerie API',
        html: `
          <div style="font-family: 'Montserrat', Arial, sans-serif; padding: 20px; background-color: #FFF1F1;">
            <h2 style="color: #0C513A; font-family: 'Garamond', serif; font-style: italic;">Test d'envoi d'email</h2>
            <p>Si vous recevez ce message, la configuration email fonctionne correctement.</p>
            <p><strong>Date de test :</strong> ${new Date().toLocaleString('fr-FR')}</p>
          </div>
        `
      };

      const result = await this.transporter.sendMail(testEmailOptions);
      console.log('✅ Email de test envoyé:', result.messageId);
      return result;
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email de test:', error);
      throw error;
    }
  }
}

export default new EmailService();