import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ContactService {
  async sendContactMessage(contactData, files = []) {
    try {
      const formData = new FormData();
    
      formData.append('name', contactData.name);
      formData.append('email', contactData.email);
      formData.append('phone', contactData.phone || '');
      formData.append('subject', contactData.subject || 'Contact général');
      formData.append('title', contactData.title || '');
      formData.append('message', contactData.message);
      formData.append('propertyInterest', contactData.propertyInterest || '');
      formData.append('source', contactData.source || 'website');
      
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append('attachments', file);
        });
      }
      
      const response = await axios.post(`${API_BASE_URL}/public/contact`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000
      });
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message de contact:', error);
      
      if (error.response) {
        const message = error.response.data?.error || 'Erreur lors de l\'envoi du message';
        throw new Error(message);
      } else if (error.request) {
        throw new Error('Impossible de contacter le serveur. Veuillez réessayer.');
      } else {
        throw new Error('Erreur lors de la préparation de la requête');
      }
    }
  }

  async validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async validatePhone(phone) {
    if (!phone) return true;
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone);
  }

  validateContactForm(formData) {
    const errors = {};

    if (!formData.nom || formData.nom.trim().length < 2) {
      errors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.prenom || formData.prenom.trim().length < 2) {
      errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!this.validateEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }

    if (formData.telephone && !this.validatePhone(formData.telephone)) {
      errors.telephone = 'Format de téléphone invalide (ex: 06 12 34 56 78)';
    }

    if (!formData.titre || formData.titre.trim().length < 3) {
      errors.titre = 'Le titre doit contenir au moins 3 caractères';
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  convertContactData(formData) {
    return {
      name: `${formData.prenom} ${formData.nom}`,
      email: formData.email,
      phone: formData.telephone,
      subject: formData.sujet || 'Contact général',
      title: formData.titre,
      message: formData.message,
      propertyInterest: '',
      source: 'contact_form'
    };
  }

  validateProprietairesForm(formData) {
    const errors = {};

    if (!formData.nom || formData.nom.trim().length < 2) {
      errors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.prenom || formData.prenom.trim().length < 2) {
      errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!this.validateEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }

    if (!formData.telephone) {
      errors.telephone = 'Le téléphone est requis';
    } else if (!this.validatePhone(formData.telephone)) {
      errors.telephone = 'Format de téléphone invalide';
    }

    if (!formData.adresse || formData.adresse.trim().length < 5) {
      errors.adresse = 'L\'adresse doit contenir au moins 5 caractères';
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  validatePartenairesForm(formData) {
    const errors = {};

    if (!formData.nom || formData.nom.trim().length < 2) {
      errors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.prenom || formData.prenom.trim().length < 2) {
      errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!formData.entreprise || formData.entreprise.trim().length < 2) {
      errors.entreprise = 'Le nom de l\'entreprise est requis';
    }

    if (!formData.poste || formData.poste.trim().length < 2) {
      errors.poste = 'Le poste est requis';
    }

    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!this.validateEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }

    if (!formData.telephone) {
      errors.telephone = 'Le téléphone est requis';
    } else if (!this.validatePhone(formData.telephone)) {
      errors.telephone = 'Format de téléphone invalide';
    }

    if (!formData.ville || formData.ville.trim().length < 2) {
      errors.ville = 'La ville est requise';
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    }

    if (formData.siteInternet && formData.siteInternet.trim()) {
      const urlRegex = /^https?:\/\/.+\..+/;
      if (!urlRegex.test(formData.siteInternet)) {
        errors.siteInternet = 'Format d\'URL invalide (doit commencer par http:// ou https://)';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  convertProprietairesData(formData) {
    return {
      name: `${formData.prenom} ${formData.nom}`,
      email: formData.email,
      phone: formData.telephone,
      subject: 'Demande propriétaire - Gestion locative',
      title: '',
      message: `Adresse du logement: ${formData.adresse}\n\nMessage:\n${formData.message}`,
      propertyInterest: formData.adresse,
      source: 'proprietaires_form'
    };
  }

  convertPartenairesData(formData) {
    return {
      name: `${formData.prenom} ${formData.nom}`,
      email: formData.email,
      phone: formData.telephone,
      subject: 'Demande de partenariat',
      title: '',
      message: `Entreprise: ${formData.entreprise}\nPoste: ${formData.poste}\nVille: ${formData.ville}\n${formData.siteInternet ? `Site web: ${formData.siteInternet}\n` : ''}\nMessage:\n${formData.message}`,
      propertyInterest: '',
      source: 'partenaires_form'
    };
  }
}

export default new ContactService();