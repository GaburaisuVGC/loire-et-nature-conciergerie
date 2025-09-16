import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function Proprietaires() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    message: '',
    photos: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      photos: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    // Ici vous ajouterez la logique d'envoi
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
      commission: "24% HT de commission hors frais de ménage à la charge des voyageurs",
      description: "Idéale pour les propriétaires qui souhaitent une gestion 100% déléguée et rentabilité en main."
    },
    {
      title: "Formule Essentielle & Locale", 
      commission: "15% HT de commission hors frais de ménage",
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
              Je confie mon bien à Loire & Nature Conciergerie
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
                            Taille maximal du fichier à 20Mo
                          </Form.Text>
                          <div className="mt-2">
                            <label htmlFor="photos" className="btn btn-outline-secondary">
                              <i className="bi bi-paperclip me-2"></i>
                              Joindre un fichier
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
                            {formData.photos && (
                              <div className="mt-2">
                                <small className="text-success">
                                  Fichier sélectionné: {formData.photos.name}
                                </small>
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