import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import contactService from '../services/contactService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyInterest: ''
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

      // Envoi du message
      const result = await contactService.sendContactMessage(formData);
      
      // Succès
      setAlertData({
        type: 'success',
        message: result.message || 'Votre message a été envoyé avec succès !'
      });
      setShowAlert(true);
      
      // Reset du formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyInterest: ''
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
            {alertData.type === 'success' && (
              <p className="mb-0 mt-2">
                <small>Merci pour votre confiance ! Nous vous recontacterons dans les plus brefs délais.</small>
              </p>
            )}
          </Alert>
        )}

        <Row>
          {/* Contact Form */}
          <Col lg={8}>
            <Card className="shadow border-0">
              <Card.Body className="p-5">
                <h3 className="font-garamond text-vert mb-4" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                  Contactez Loire & Nature Conciergerie
                </h3>
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nom complet *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Votre nom et prénom"
                          isInvalid={!!formErrors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
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
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="06 12 34 56 78"
                          isInvalid={!!formErrors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sujet</Form.Label>
                        <Form.Select
                          name="subject"
                          value={formData.subject}
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

                  <Form.Group className="mb-3">
                    <Form.Label>Propriété d'intérêt (optionnel)</Form.Label>
                    <Form.Control
                      type="text"
                      name="propertyInterest"
                      value={formData.propertyInterest}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Nom de la propriété qui vous intéresse"
                    />
                    <Form.Text className="text-muted">
                      Si votre demande concerne une propriété spécifique
                    </Form.Text>
                  </Form.Group>

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

                  <div className="text-end">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="px-5 py-2"
                      style={{ 
                        backgroundColor: 'var(--vert-loire)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        fontFamily: 'Montserrat',
                        fontWeight: '500'
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
                          Envoi...
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