/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import contactService from '../services/contactService';

export default function Proprietaires() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    message: '',
    photos: []
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
      photos: files
    }));
    
    // Effacer l'erreur pour ce champ
    if (formErrors.photos) {
      setFormErrors(prev => ({
        ...prev,
        photos: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);
    
    try {
      // Validation du formulaire
      const validation = contactService.validateProprietairesForm(formData);
      
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
      const contactData = contactService.convertProprietairesData(formData, formData.photos);
      
      // Envoi du message avec les fichiers
      const result = await contactService.sendContactMessage(contactData, formData.photos);
      
      // Succès
      setAlertData({
        type: 'success',
        message: result.message || 'Votre demande a été envoyée avec succès !'
      });
      setShowAlert(true);
      
      // Reset du formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        message: '',
        photos: []
      });
      setFormErrors({});
      
      // Reset le champ file input
      const fileInput = document.getElementById('photos');
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

  const prestations = [
    {
      title: "Photos du bien",
      description: "Attirez l'œil dès le premier clic avec des photos professionnelles de votre logement. Des visuels soignés pour valoriser votre bien et booster vos réservations. Nous révélons le meilleur de votre logement grâce à des clichés lumineux et attractifs. Un logement bien présenté, c'est plus de visibilité et un meilleur taux d'occupation.",
      icon: "bi-camera-fill"
    },
    {
      title: "Création, mise en ligne et gestion des annonces",
      description: "Des annonces rédigées avec soin pour maximiser la visibilité de votre logement. Un contenu optimisé qui donne envie aux voyageurs de réserver rapidement. Diffusion sur les principales plateformes (Airbnb, Booking, etc.) pour toucher un large public. Notre objectif : booster votre taux d'occupation grâce à des annonces efficaces et attractives.",
      icon: "bi-file-text-fill"
    },
    {
      title: "Communication et expériences voyageurs",
      description: "Livret d'accueil numérique pour une information claire et pratique. Arrivées et départs autonomes, flexibles et sécurisés. Communication réactive avec les voyageurs, 7j/7. Un accompagnement complet, du premier clic à la fin du séjour. Plateau de bienvenue et attentions locales pour une expérience unique.",
      icon: "bi-chat-dots-fill"
    },
    {
      title: "Revenus et Optimisation des prix",
      description: "Des prix ajustés en temps réel selon la demande et la saisonnalité. Analyse des performances passées et des tendances du marché. Une stratégie tarifaire intelligente pour maximiser vos revenus. Optimisation du rendement locatif grâce à une gestion dynamique des prix.",
      icon: "bi-graph-up-arrow"
    },
    {
      title: "Organisation et réalisation des prestations de ménage",
      description: "Prestations de ménage rigoureuses à chaque départ de voyageurs. Un protocole de nettoyage défini pour garantir propreté et confort. Utilisation privilégiée de produits écologiques et respectueux de l'environnement. Un entretien régulier qui préserve la qualité et la valeur de votre logement.",
      icon: "bi-house-check-fill"
    },
    {
      title: "Accompagnement & préparation de votre logement",
      description: "Conseils personnalisés en décoration, ameublement et équipements. Un logement adapté aux attentes des voyageurs d'aujourd'hui. Optimisation de votre espace pour un accueil chaleureux et fonctionnel. Valorisation de votre bien afin de séduire un public exigeant.",
      icon: "bi-house-heart-fill"
    },
    {
      title: "Organisation et supervision des petits travaux de maintenance",
      description: "Interventions rapides avant l'arrivée des voyageurs. Mise en relation avec un réseau d'artisans de confiance. Suivi et supervision pour garantir la qualité des réparations.",
      icon: "bi-tools"
    }
  ];

  const offres = [
    {
      title: "Formule 100% tranquilité",
      commission: "Commission hors frais de ménage à la charge des voyageurs",
      description: "Idéale pour les propriétaires qui souhaitent une gestion 100% déléguée et rentabilité en main."
    },
    {
      title: "Formule Essentielle & Locale", 
      commission: "Commission hors frais de ménage",
      description: "Idéale pour propriétaires qui souhaitent garder un rôle actif tout en profitant de notre savoir-faire."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          backgroundImage: `url('/hero-image-proprietaires.jpg')`,
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
              Nos Prestations et Tarifs
            </h1>
            <div className="hero-text text-center text-white" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                Pour vous, nous donnons une identité à votre logement.
                Nous vous accompagnons sur toutes les étapes en vous proposant des solutions 
                simple et efficace. afin de donner de la visibilité à votre bien.
                Nous avons à cœur de fidéliser vos voyageurs.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                Confiez nous la gestion locative de vos biens afin de vous libérer en toute sérénité et 
                accroître vos revenus locatifs.
              </p>
            </div>
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
        {/* Section Nos prestations et tarifs */}
        <section className="py-5">
          <div className="section-title">
            <h2 className="font-garamond text-vert" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Nos prestations et tarifs
            </h2>
          </div>

          <Row className="g-4 justify-content-center">
            {prestations.map((prestation, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="h-100 prestation-card shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="icon-container mb-3 text-center">
                      <i className={`${prestation.icon} text-vert`} style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h5 className="font-garamond text-vert mb-3" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                      {prestation.title}
                    </h5>
                    <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {prestation.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Section Nos offres */}
        <section className="py-5">
          <div className="section-title">
            <h2 className="font-garamond text-vert" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Nos offres
            </h2>
          </div>

          <Row className="g-4 justify-content-center">
            {offres.map((offre, index) => (
              <Col lg={5} key={index} className="mb-4">
                <Card className="h-100 offre-card shadow border-0">
                  <Card.Body className="p-4 text-center">
                    <h4 className="font-garamond text-vert mb-3" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                      {offre.title}
                    </h4>
                    <h6 className="text-vert mb-3" style={{ fontWeight: 'bold' }}>
                      {offre.commission}
                    </h6>
                    <p className="text-muted" style={{ lineHeight: '1.6' }}>
                      {offre.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Formulaire de contact */}
        <section className="py-5">
          <div className="section-title">
            <h2 className="font-garamond text-vert" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Devis sur Demande, (1er rendez-vous pour une estimation offerte)
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
                      <Col>
                        <Form.Group>
                          <Form.Label>Adresse du logement</Form.Label>
                          <Form.Control
                            type="text"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col>
                        <Form.Group>
                          <Form.Label>Message</Form.Label>
                          <Form.Text className="text-muted fst-italic">
                            Dites nous tout sur vos besoins, votre bien, et joignez nous des photos
                          </Form.Text>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="align-items-end">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Photos du logement</Form.Label>
                          <Form.Text className="text-muted fst-italic d-block">
                            Maximum 5 fichiers, 20Mo par fichier
                          </Form.Text>
                          <div className="mt-2">
                            <label htmlFor="photos" className="btn btn-outline-secondary">
                              <i className="bi bi-paperclip me-2"></i>
                              Joindre des fichiers
                            </label>
                            <input
                              type="file"
                              id="photos"
                              name="photos"
                              onChange={handleFileChange}
                              accept="image/*"
                              multiple
                              style={{ display: 'none' }}
                            />
                            {formData.photos && formData.photos.length > 0 && (
                              <div className="mt-2">
                                <small className="text-success">
                                  {formData.photos.length} fichier(s) sélectionné(s):
                                  <ul className="mb-0">
                                    {Array.from(formData.photos).map((file, index) => (
                                      <li key={index}>{file.name}</li>
                                    ))}
                                  </ul>
                                </small>
                              </div>
                            )}
                            {formErrors.photos && (
                              <div className="text-danger small mt-1">
                                {formErrors.photos}
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