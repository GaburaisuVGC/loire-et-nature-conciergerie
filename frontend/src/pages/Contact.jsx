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
    
    // Effacer l'erreur du champ modifié
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
      // Validation côté client
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
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyInterest: ''
      });
      setFormErrors({});
      
      // Scroll vers le haut pour voir le message de succès
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
    <Container className="py-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <div className="text-center mb-5">
            <h1 className="text-primary-custom">Contactez-nous</h1>
            <p className="lead text-muted">
              Nous sommes à votre écoute pour tous vos projets de conciergerie et gestion locative
            </p>
          </div>

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
              <Card>
                <Card.Body className="p-4">
                  <h3 className="text-primary-custom mb-4">Envoyez-nous un message</h3>
                  
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
                            placeholder="06 XX XX XX XX"
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
                      <Form.Text className="text-muted">
                        Minimum 10 caractères
                      </Form.Text>
                    </Form.Group>

                    <div className="d-grid">
                      <Button
                        type="submit"
                        className="btn-primary"
                        size="lg"
                        disabled={loading}
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
                          <>
                            <i className="bi bi-envelope me-2"></i>
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Details */}
            <Col lg={4}>
              <Card className="bg-rose-custom border-0">
                <Card.Body className="p-4">
                  <h4 className="text-primary-custom mb-3">Nos coordonnées</h4>
                  
                  <div className="mb-3">
                    <h6><i className="bi bi-geo-alt text-primary-custom me-2"></i>Adresse</h6>
                    <p className="mb-0 text-muted">
                      Région Orléanaise<br />
                      Loiret (45), France
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6><i className="bi bi-telephone text-primary-custom me-2"></i>Téléphone</h6>
                    <p className="mb-0">
                      <a href="tel:+33200000000" className="text-decoration-none">
                        +33 (0)2 XX XX XX XX
                      </a>
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6><i className="bi bi-envelope text-primary-custom me-2"></i>Email</h6>
                    <p className="mb-0">
                      <a href="mailto:contact@loire-nature-conciergerie.fr" className="text-decoration-none">
                        contact@loire-nature-conciergerie.fr
                      </a>
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6><i className="bi bi-clock text-primary-custom me-2"></i>Horaires</h6>
                    <p className="mb-0 text-muted">
                      Lundi - Vendredi : 9h - 18h<br />
                      Samedi : 9h - 12h<br />
                      Dimanche : Fermé
                    </p>
                  </div>

                  <hr className="my-3" />

                  <div>
                    <h6 className="text-primary-custom mb-2">Zone d'intervention</h6>
                    <p className="text-muted small mb-0">
                      Agglomération Orléanaise : Mardié, Chécy, Combleux, 
                      La Chapelle Saint-Mesmin et communes environnantes.
                    </p>
                  </div>

                  <hr className="my-3" />

                  <div className="text-center">
                    <h6 className="text-primary-custom mb-2">Urgences</h6>
                    <p className="text-muted small mb-2">
                      Pour les urgences techniques uniquement
                    </p>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      href="tel:+33600000000"
                    >
                      <i className="bi bi-telephone-fill me-1"></i>
                      Ligne urgence
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* FAQ rapide */}
              <Card className="mt-3">
                <Card.Body className="p-3">
                  <h6 className="text-primary-custom mb-3">Questions fréquentes</h6>
                  <div className="small">
                    <p className="mb-2">
                      <strong>Délai de réponse :</strong><br />
                      Nous répondons sous 24h ouvrées
                    </p>
                    <p className="mb-2">
                      <strong>Devis :</strong><br />
                      Gratuit et sans engagement
                    </p>
                    <p className="mb-0">
                      <strong>Zone d'intervention :</strong><br />
                      Agglomération Orléanaise + 20km
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}