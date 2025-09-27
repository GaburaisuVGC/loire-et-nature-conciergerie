import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import contactService from "../services/contactService";

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    titre: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: '', message: '' });

  const validateForm = () => {
    const errors = {};

    if (!formData.nom.trim()) {
      errors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      errors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.prenom.trim()) {
      errors.prenom = 'Le prénom est requis';
    } else if (formData.prenom.trim().length < 2) {
      errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }

    if (formData.telephone.trim() && !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.telephone.replace(/\s/g, ''))) {
      errors.telephone = 'Format de téléphone invalide';
    }

    if (!formData.message.trim()) {
      errors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setFormErrors({});

    try {
      const contactData = {
        name: `${formData.prenom} ${formData.nom}`,
        email: formData.email,
        phone: formData.telephone,
        subject: formData.sujet || 'Contact depuis le site web',
        title: formData.titre,
        message: formData.message,
        source: 'contact-page'
      };

      await contactService.sendContactMessage(contactData);
      
      setAlertData({
        type: 'success',
        message: 'Votre message a été envoyé avec succès. Nous vous recontacterons dans les plus brefs délais.'
      });
      
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        sujet: '',
        titre: '',
        message: ''
      });
      
      setShowAlert(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setAlertData({
        type: 'danger',
        message: error.message || 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.'
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          backgroundImage: `url('/hero-image-contact.jpg')`,
          backgroundColor: '#D8CBB5',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
       <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content text-center">
            <h1 className="font-garamond text-vert hero-title" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              Une question ? Contactez-nous !
            </h1>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        {/* Alert pour les messages */}
        {showAlert && (
          <Alert 
            variant={alertData.type} 
            dismissible 
            onClose={() => setShowAlert(false)}
            className="mb-4"
          >
            <h5>
              {alertData.type === 'success' ? '✅ Message envoyé !' : '❌ Erreur'}
            </h5>
            <p className="mb-0">{alertData.message}</p>
          </Alert>
        )}

        <Row>
          {/* Colonne de gauche - Cards d'information */}
          <Col lg={4} className="mb-4">
            {/* Card Contact */}
            <Card className="shadow border-0 mb-4">
              <Card.Body className="p-4 text-center">
                <div className="mb-3">
                  <i className="bi bi-chat-dots-fill text-vert" style={{ fontSize: '2rem' }}></i>
                </div>
                <h4 className="font-garamond text-vert mb-3" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Contact
                </h4>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <i className="bi bi-house-fill text-vert me-2"></i>
                    <span>Loire & Nature Conciergerie</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <i className="bi bi-telephone-fill text-vert me-2"></i>
                    <a href="tel:0743535331" className="text-decoration-none text-dark">07 43 53 53 31</a>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <i className="bi bi-envelope-fill text-vert me-2"></i>
                    <a href="mailto:loire.et.nature.conciergerie@gmail.com" className="text-decoration-none text-dark">
                      loire.et.nature.conciergerie@gmail.com
                    </a>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-vert">
                    <i className="bi bi-facebook" style={{ fontSize: '1.2rem' }}></i>
                  </a>
                  <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-vert">
                    <i className="bi bi-google" style={{ fontSize: '1.2rem' }}></i>
                  </a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-vert">
                    <i className="bi bi-linkedin" style={{ fontSize: '1.2rem' }}></i>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-vert">
                    <i className="bi bi-instagram" style={{ fontSize: '1.2rem' }}></i>
                  </a>
                </div>
              </Card.Body>
            </Card>

            {/* Card Loire & Nature Conciergerie */}
            <Card className="shadow border-0">
              <Card.Body className="p-4 text-center">
                <div className="mb-3">
                  <i className="bi bi-house-fill text-vert" style={{ fontSize: '2rem' }}></i>
                </div>
                <h4 className="font-garamond text-vert mb-3" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Loire & Nature Conciergerie
                </h4>
                <p style={{ lineHeight: '1.6' }}>
                  Une conciergerie née du désir de faire découvrir, accueillir et valoriser, 
                  dans le respect des valeurs simples et essentielles, notre région.
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* Colonne de droite - Formulaire de contact */}
          <Col lg={8}>
            <Card className="shadow border-0">
              <Card.Body className="p-5">
                <h3 className="font-garamond text-vert mb-4 text-center" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                  Contactez Loire & Nature Conciergerie
                </h3>
                
                <Form onSubmit={handleSubmit}>
                  {/* Ligne 1: Nom, Prénom */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Votre nom"
                          isInvalid={!!formErrors.nom}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.nom}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Prénom *</Form.Label>
                        <Form.Control
                          type="text"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Votre prénom"
                          isInvalid={!!formErrors.prenom}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.prenom}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Ligne 2: Email, Téléphone */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="votre.email@exemple.fr"
                          isInvalid={!!formErrors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="06 12 34 56 78"
                          isInvalid={!!formErrors.telephone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.telephone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Ligne 3: Sujet */}
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sujet</Form.Label>
                        <Form.Control
                          type="text"
                          name="sujet"
                          value={formData.sujet}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="Sujet de votre message"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Ligne 4: Titre */}
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control
                          type="text"
                          name="titre"
                          value={formData.titre}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="Titre de votre demande"
                          isInvalid={!!formErrors.titre}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.titre}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Ligne 5: Message */}
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-4">
                        <Form.Label>Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Décrivez votre demande en détail..."
                          isInvalid={!!formErrors.message}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="btn-custom-vert px-5 py-2"
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '600'
                      }}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Envoi en cours...
                        </>
                      ) : (
                        'Envoyer le message'
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}