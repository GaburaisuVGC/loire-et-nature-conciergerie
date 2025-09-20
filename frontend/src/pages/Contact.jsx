import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import contactService from '../services/contactService';

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
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: 'success', message: '' });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
    setLoading(true);
    setShowAlert(false);
    
    try {
      // Validation du formulaire
      const validation = contactService.validateContactForm(formData);
      
      if (!validation.isValid) {
        setFormErrors(validation.errors);
        setAlertData({
          type: 'danger',
          message: 'Veuillez corriger les erreurs dans le formulaire.'
        });
        setShowAlert(true);
        return;
      }

      // Conversion des données vers le format du service
      const contactData = contactService.convertContactData(formData);

      // Envoi du message
      const result = await contactService.sendContactMessage(contactData);
      
      // Succès
      setAlertData({
        type: 'success',
        message: result.message || 'Votre message a été envoyé avec succès !'
      });
      setShowAlert(true);
      
      // Reset du formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        sujet: '',
        titre: '',
        message: ''
      });
      setFormErrors({});
      
      // Scroll vers le haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setAlertData({
        type: 'danger',
        message: error.message || 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
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
          backgroundColor: 'var(--rose-pale)',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
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

        <Row className="justify-content-center">
          {/* Contact Form - Centré */}
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
                        <Form.Select
                          name="sujet"
                          value={formData.sujet}
                          onChange={handleChange}
                          disabled={loading}
                        >
                          <option value="">Choisissez un sujet</option>
                          <option value="gestion-locative">Gestion locative</option>
                          <option value="conciergerie">Services de conciergerie</option>
                          <option value="reservation">Demande de réservation</option>
                          <option value="maintenance">Maintenance et entretien</option>
                          <option value="partenariat">Partenariat</option>
                          <option value="autre">Autre demande</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Ligne 4: Titre */}
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Titre *</Form.Label>
                        <Form.Control
                          type="text"
                          name="titre"
                          value={formData.titre}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Objet de votre demande"
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