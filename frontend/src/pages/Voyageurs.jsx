import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Voyageurs() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          backgroundImage: 'url(/hero-image-voyageurs.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <div className="hero-overlay"></div>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content text-center">
            <h1 className="font-garamond text-vert hero-title" style={{ 
              fontStyle: 'italic', 
              fontWeight: 'bold',
              color: 'white',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Voyageurs
            </h1>
          </div>
        </Container>
      </section>

      {/* Section texte d'accompagnement */}
      <section className="py-5">
        <Container>
          <div className="text-center">
            <div style={{ 
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <p className="mb-0">
                Loire et Nature Conciergerie vous accompagnent dans vos voyages
                et vous proposent des maisons et appartements idéalement situés,
                ainsi qu'un service attentif et personnalisé pour un confort "comme à la maison" !
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        {/* Section Nos offres */}
        <section className="py-5">
          <div className="section-title">
            <h2 className="font-garamond text-vert" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Nos offres
            </h2>
          </div>

          <Row className="g-4">
            {/* Formule tranquilité */}
            <Col lg={6} md={6}>
              <Card className="h-100 shadow border-0 offre-card">
                <Card.Body className="p-4">
                  <h4 className="font-garamond text-vert mb-4" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                    Formule tranquilité
                  </h4>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-vert me-2"></i>
                      Pack d'accueil standard <sup>1</sup>
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-vert me-2"></i>
                      Check-in personnalisé avec un accueil sur place à l'arrivée <sup>2</sup>
                    </li>
                    <li className="mb-3">
                      ou
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-vert me-2"></i>
                      Check-in autonome <sup>3</sup>
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-vert me-2"></i>
                      Horaires du lundi au vendredi 9h-18h
                    </li>
                    <li className="mb-0">
                      <i className="bi bi-check-circle-fill text-vert me-2"></i>
                      Assistance téléphonique jusqu'à 21h 7j/7
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Des services à la carte */}
            <Col lg={6} md={6}>
              <Card className="h-100 shadow border-0 offre-card">
                <Card.Body className="p-4">
                  <h4 className="font-garamond text-vert mb-4" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                    Des services à la carte
                  </h4>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-vert me-2"></i>
                      Pack d'accueil premium (deux produits locaux au choix selon disponiblité)
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-vert me-2"></i>
                      Paniers petit déjeuner local
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-vert me-2"></i>
                      Paniers apéritifs du terroir
                    </li>
                    <li className="mb-0">
                      <i className="bi bi-check-circle-fill text-vert me-2"></i>
                      Produits locaux
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Section des notes explicatives */}
        <section className="py-4">
          <div className="bg-rose-pale p-4 rounded">
            <h5 className="font-garamond text-vert mb-3" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Notes explicatives
            </h5>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              <p className="mb-2">
                <sup>1</sup> (eau; café; thé; savon main; éponge; liquide vaisselle)
              </p>
              <p className="mb-2">
                <sup>2</sup> Réservation obligatoire à la commande. Pour l'offre autonome, mise à disposition de boite à clés ou digicode.
              </p>
              <p className="mb-0">
                <sup>3</sup> Mise à disposition de boite à clés ou digicode.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}