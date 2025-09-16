// backend/src/services/emailService.js
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';

dotenv.config();

class EmailService {
  constructor() {
    this.adminEmail = process.env.ADMIN_EMAIL || 'loire.et.nature.conciergerie@gmail.com';
    this.senderEmail = process.env.EMAIL_FROM || 'loire.et.nature.conciergerie@gmail.com';
    this.provider = process.env.EMAIL_PROVIDER || 'gmail';
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    if (this.provider === 'sendgrid') {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY
        }
      });
    } else if (this.provider === 'gmail') {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
    } else if (this.provider === 'test') {
      // Mode test pour le développement
      this.transporter = {
        sendMail: async (options) => {
          console.log('📧 [TEST MODE] Email envoyé:', options);
          return { messageId: 'test-' + Date.now() };
        }
      };
    }
  }

  async testEmailConfiguration() {
    if (this.provider === 'test') {
      return true;
    }
    
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Configuration email invalide:', error.message);
      return false;
    }
  }

  // Préparer les pièces jointes pour nodemailer
  prepareAttachments(files) {
    if (!files || files.length === 0) return [];
    
    return files.map(file => ({
      filename: file.originalname,
      path: file.path,
      contentType: file.mimetype
    }));
  }

  // Envoyer la notification de contact à l'administrateur
  async sendContactNotification(contactData) {
    const { 
      name, 
      email, 
      phone, 
      subject, 
      message, 
      propertyInterest, 
      timestamp,
      source,
      attachments = []
    } = contactData;

    // Préparer les pièces jointes
    const mailAttachments = this.prepareAttachments(attachments);

    // Email pour l'administrateur
    const adminMailOptions = {
      from: `"Loire & Nature Conciergerie" <${this.senderEmail}>`,
      to: this.adminEmail,
      replyTo: email,
      subject: `[Site Web] ${subject}`,
      html: this.generateAdminNotificationHTML(contactData),
      attachments: mailAttachments
    };

    // Email de confirmation pour le client
    const clientMailOptions = {
      from: `"Loire & Nature Conciergerie" <${this.senderEmail}>`,
      to: email,
      subject: 'Confirmation de votre message - Loire & Nature Conciergerie',
      html: this.generateClientConfirmationHTML(contactData)
      // Pas de pièces jointes dans l'email de confirmation
    };

    try {
      // Envoyer l'email à l'administrateur
      const adminResult = await this.transporter.sendMail(adminMailOptions);
      console.log('Email envoyé à l\'administrateur:', adminResult.messageId);

      // Envoyer l'email de confirmation au client
      const clientResult = await this.transporter.sendMail(clientMailOptions);
      console.log('Email de confirmation envoyé au client:', clientResult.messageId);

      return {
        success: true,
        adminMessageId: adminResult.messageId,
        clientMessageId: clientResult.messageId
      };
    } catch (error) {
      console.error('Erreur lors de l\'envoi des emails:', error);
      throw error;
    }
  }

  // Envoyer un email de test
  async sendTestEmail(toEmail) {
    const mailOptions = {
      from: `"Loire & Nature Conciergerie" <${this.senderEmail}>`,
      to: toEmail,
      subject: 'Email de test - Loire & Nature Conciergerie',
      html: `
        <div style="font-family: 'Montserrat', Arial, sans-serif; padding: 20px;">
          <h2 style="color: #0C513A;">Test de configuration email</h2>
          <p>Cet email confirme que la configuration est correcte.</p>
          <p>Provider: ${this.provider}</p>
          <p>Envoyé le: ${new Date().toLocaleString('fr-FR')}</p>
        </div>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }

  // Générer le HTML pour l'email de notification à l'administrateur
  generateAdminNotificationHTML({ 
    name, 
    email, 
    phone, 
    subject, 
    message, 
    propertyInterest, 
    timestamp,
    source,
    attachments = []
  }) {
    const formattedDate = new Date(timestamp).toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris'
    });

    // Déterminer l'origine du formulaire
    let sourceLabel = 'Site web';
    if (source === 'proprietaires_form') {
      sourceLabel = 'Formulaire Propriétaires';
    } else if (source === 'partenaires_form') {
      sourceLabel = 'Formulaire Partenaires';
    }

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
            .attachments { background-color: #f9f9f9; padding: 10px; margin-top: 15px; border-radius: 5px; }
            .source-badge { 
              display: inline-block; 
              background-color: #C6A462; 
              color: white; 
              padding: 5px 10px; 
              border-radius: 15px; 
              font-size: 12px; 
              margin-bottom: 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="font-family: 'Garamond', serif; font-style: italic; font-weight: bold;">Loire & Nature Conciergerie</h1>
              <p>Nouveau message depuis le site web</p>
            </div>
            
            <div class="content">
              <span class="source-badge">${sourceLabel}</span>
              
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
              
              ${attachments && attachments.length > 0 ? `
              <div class="attachments">
                <strong>📎 Pièces jointes (${attachments.length}) :</strong>
                <ul style="margin-top: 10px;">
                  ${attachments.map(file => `
                    <li>${file.originalname} (${(file.size / 1024).toFixed(2)} KB)</li>
                  `).join('')}
                </ul>
              </div>
              ` : ''}
            </div>
            
            <div class="footer">
              <p>Ce message a été envoyé depuis le ${sourceLabel} du site web Loire & Nature Conciergerie</p>
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
              
              <p>Nous avons bien reçu votre message du <strong>${formattedDate}</strong> concernant :</p>
              
              <div class="highlight">
                <strong>${subject}</strong>
              </div>
              
              <p>Nous vous répondrons dans les plus brefs délais.</p>
              
              <p>En attendant, n'hésitez pas à parcourir nos propriétés et services sur notre site web.</p>
              
              <div class="contact-info">
                <h3 style="color: #0C513A;">Nos coordonnées</h3>
                <p>
                  📧 Email : loire.et.nature.conciergerie@gmail.com<br>
                  🌐 Site web : www.loire-et-nature-conciergerie.netlify.app
                </p>
              </div>
              
              <p style="margin-top: 30px;">
                Cordialement,<br>
                <strong>Loire & Nature Conciergerie</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

export default new EmailService();