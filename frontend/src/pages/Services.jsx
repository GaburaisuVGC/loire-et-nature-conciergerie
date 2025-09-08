import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const detailedServices = [
  {
    icon: "🏠",
    title: "Gestion Locative Complète",
    description: "Prise en charge intégrale de vos locations saisonnières",
    features: [
      "Accueil et check-in des locataires",
      "Gestion des réservations et planning",
      "État des lieux d'entrée et de sortie",
      "Gestion des réclamations et incidents",
      "Suivi comptable et reporting",
    ],
  },
  {
    icon: "🌱",
    title: "Entretien & Jardinage",
    description: "Maintien de vos espaces verts en parfait état",
    features: [
      "Tonte et entretien des pelouses",
      "Taille des haies et arbustes",
      "Plantation et aménagement paysager",
      "Désherbage écologique",
      "Arrosage et soins des plantes",
    ],
  },
  {
    icon: "🔧",
    title: "Maintenance Technique",
    description: "Interventions rapides pour préserver vos biens",
    features: [
      "Plomberie et électricité de base",
      "Réparations urgentes",
      "Maintenance préventive",
      "Coordination avec artisans spécialisés",
      "Suivi des garanties équipements",
    ],
  },
  {
    icon: "🧹",
    title: "Nettoyage Professionnel",
    description: "Service de ménage haut de gamme entre locations",
    features: [
      "Nettoyage approfondi post-location",
      "Changement et entretien du linge",
      "Désinfection et assainissement",
      "Vérification et réapprovisionnement",
      "Préparation à l'accueil clients",
    ],
  },
  {
    icon: "📋",
    title: "Conciergerie Premium",
    description: "Services personnalisés pour une expérience unique",
    features: [
      "Courses et approvisionnement",
      "Réservations restaurants et activités",
      "Organisation d'événements",
      "Services de transport",
      "Conciergerie 24h/7j",
    ],
  },
  {
    icon: "🔒",
    title: "Surveillance & Sécurité",
    description: "Protection et surveillance de vos propriétés",
    features: [
      "Rondes de surveillance régulières",
      "Vérification sécurité avant/après location",
      "Gestion des alarmes et incidents",
      "Coordination avec services sécurité",
      "Rapport détaillé d'activité",
    ],
  },
];

export default function Services() {
  return (
    <div className="py-5">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={10} className="text-center">
            <h1 className="text-primary-custom mb-3">Nos Services</h1>
            <p className="lead">
              Des solutions complètes et personnalisées pour la gestion et
              l'entretien de vos propriétés en Loire-Atlantique.
            </p>
          </Col>
        </Row>

        <Row>
          {detailedServices.map((service, index) => (
            <Col lg={4} md={6} key={index} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-3">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "var(--color-vert-nature)",
                        fontSize: "1.5rem",
                      }}
                    >
                      {service.icon}
                    </div>
                    <h4 className="text-primary-custom">{service.title}</h4>
                    <p className="text-muted">{service.description}</p>
                  </div>

                  <ul className="list-unstyled">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="mb-2">
                        <i className="bi bi-check-circle-fill text-primary-custom me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-5">
          <Col lg={12}>
            <div className="bg-rose-custom p-5 rounded text-center">
              <h3 className="text-primary-custom mb-3">Un Service Sur Mesure</h3>
              <p className="lead mb-4">
                Chaque propriété est unique, c&apos;est pourquoi nous adaptons nos
                services à vos besoins spécifiques. Contactez-nous pour établir un
                devis personnalisé.
              </p>
              <a href="/contact" className="btn btn-primary btn-lg">
                Demander un devis
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
