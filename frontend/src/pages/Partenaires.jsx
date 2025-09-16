/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import contactService from '../services/contactService';

export default function Partenaires() {
   const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    entreprise: '',
    poste: '',
    email: '',
    telephone: '',
    ville: '',
    siteInternet: '',
    message: '',
    pieceJointe: []
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: 'success', message: '' });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Effacer l'erreur pour ce champ quand l'utilisateur commence à taper
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Limiter à 5 fichiers maximum
    if (files.length > 5) {
      setAlertData({
        type: 'warning',
        message: 'Vous ne pouvez joindre que 5 fichiers maximum.'
      });
      setShowAlert(true);
      return;
    }
    
    setFormData(prevState => ({
      ...prevState,
      pieceJointe: files
    }));
    
    // Effacer l'erreur pour ce champ
    if (formErrors.pieceJointe) {
      setFormErrors(prev => ({
        ...prev,
        pieceJointe: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);
    
    try {
      // Validation du formulaire
      const validation = contactService.validatePartenairesForm(formData);
      
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
      const contactData = contactService.convertPartenairesData(formData, formData.pieceJointe);
      
      // Envoi du message avec les fichiers
      const result = await contactService.sendContactMessage(contactData, formData.pieceJointe);
      
      // Succès
      setAlertData({
        type: 'success',
        message: result.message || 'Votre demande de partenariat a été envoyée avec succès !'
      });
      setShowAlert(true);
      
      // Reset du formulaire
      setFormData({
        nom: '',
        prenom: '',
        entreprise: '',
        poste: '',
        email: '',
        telephone: '',
        ville: '',
        siteInternet: '',
        message: '',
        pieceJointe: []
      });
      setFormErrors({});
      
      // Reset le champ file input
      const fileInput = document.getElementById('pieceJointe');
      if (fileInput) {
        fileInput.value = '';
      }
      
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
          backgroundImage: `url('/hero-image-partenaires.png')`,
          backgroundColor: 'var(--rose-pale)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh'
        }}
      >
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content">
            <h1 className="font-garamond text-vert hero-title" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              Artisans - Professionnels - Prestataires de Services
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
                <small>Merci pour votre intérêt ! Nous étudierons votre demande et vous recontacterons rapidement.</small>
              </p>
            )}
          </Alert>
        )}
        {/* Section texte principal */}
        <section className="py-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="partenaires-content">
                <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Chez Loire & Nature, nous croyons que la réussite d'un séjour passe aussi par les rencontres et les
                  découvertes locales.
                </p>
                
                <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  C'est pourquoi nous avons choisi de travailler main dans la main avec des artisans, producteurs et
                  prestataires passionnés.
                </p>

                <h3 className="font-garamond text-vert mt-5 mb-4" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                  Pourquoi devenir partenaire ?
                </h3>

                <div className="avantages-partenaires">
                  <div className="avantage-item mb-4">
                    <h5 className="text-vert font-weight-bold">Valoriser votre savoir-faire :</h5>
                    <p style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                      vos produits et services sont mis en avant auprès de voyageurs
                      en quête d'authenticité.
                    </p>
                  </div>

                  <div className="avantage-item mb-4">
                    <h5 className="text-vert font-weight-bold">Gagner en visibilité :</h5>
                    <p style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                      nous intégrons nos partenaires dans nos paniers d'accueil,
                      nos recommandations et sur nos supports de communication.
                    </p>
                  </div>

                  <div className="avantage-item mb-4">
                    <h5 className="text-vert font-weight-bold">Développer une économie locale durable :</h5>
                    <p style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                      ensemble, nous faisons rayonner notre région
                      et soutenons une consommation responsable.
                    </p>
                  </div>

                  <div className="avantage-item mb-4">
                    <h5 className="text-vert font-weight-bold">Créer une relation de confiance :</h5>
                    <p style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                      nous privilégions des partenariats humains,
                      durables et fondés sur des valeurs communes.
                    </p>
                  </div>
                </div>

                <h3 className="font-garamond text-vert mt-5 mb-4" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                  Une vitrine pour vos produits et services
                </h3>

                <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Qu'il s'agisse de produits du terroir, de prestations de bien-être, d'activités nature,
                  ou encore de services techniques (ménage, entretien, maintenance),
                  nous mettons en avant vos talents auprès d'une clientèle sensible à l'authenticité et au local.
                </p>

                <p className="mb-5" style={{ fontSize: '1.1rem', lineHeight: '1.8', fontWeight: '500' }}>
                  En rejoignant Loire & Nature, vous devenez bien plus qu'un prestataire : 
                  vous devenez un acteur clé de l'expérience voyageur.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Formulaire de contact */}
        <section className="py-5">
          <div className="section-title">
            <h2 className="font-garamond text-vert" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Formulaire de contact
            </h2>
          </div>

          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="shadow border-0">
                <Card.Body className="p-5">
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Votre nom</Form.Label>
                          <Form.Control
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Votre prénom</Form.Label>
                          <Form.Control
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Entreprise</Form.Label>
                          <Form.Control
                            type="text"
                            name="entreprise"
                            value={formData.entreprise}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Poste</Form.Label>
                          <Form.Control
                            type="text"
                            name="poste"
                            value={formData.poste}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Téléphone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Ville</Form.Label>
                          <Form.Control
                            type="text"
                            name="ville"
                            value={formData.ville}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Site Internet</Form.Label>
                          <Form.Control
                            type="url"
                            name="siteInternet"
                            value={formData.siteInternet}
                            onChange={handleInputChange}
                            placeholder="https://..."
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col>
                        <Form.Group>
                          <Form.Label>Dites nous en plus !</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Présentez-nous votre entreprise, vos services, vos produits..."
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="align-items-end">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Pièces jointes</Form.Label>
                          <Form.Text className="text-muted fst-italic d-block">
                            Maximum 5 fichiers, 20Mo par fichier (PDF, Word, images)
                          </Form.Text>
                          <div className="mt-2">
                            <label htmlFor="pieceJointe" className="btn btn-outline-secondary">
                              <i className="bi bi-paperclip me-2"></i>
                              Joindre des fichiers
                            </label>
                            <input
                              type="file"
                              id="pieceJointe"
                              name="pieceJointe"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              multiple
                              style={{ display: 'none' }}
                            />
                            {formData.pieceJointe && formData.pieceJointe.length > 0 && (
                              <div className="mt-2">
                                <small className="text-success">
                                  {formData.pieceJointe.length} fichier(s) sélectionné(s):
                                  <ul className="mb-0">
                                    {Array.from(formData.pieceJointe).map((file, index) => (
                                      <li key={index}>{file.name}</li>
                                    ))}
                                  </ul>
                                </small>
                              </div>
                            )}
                            {formErrors.pieceJointe && (
                              <div className="text-danger small mt-1">
                                {formErrors.pieceJointe}
                              </div>
                            )}
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="text-end">
                        <Button 
                          type="submit" 
                          className="btn-custom-vert px-5 py-2"
                          style={{ 
                            backgroundColor: 'var(--vert-loire)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px'
                          }}
                        >
                          Envoyer
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
}