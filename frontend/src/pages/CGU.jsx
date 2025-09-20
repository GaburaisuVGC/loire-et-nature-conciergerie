import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function CGU() {
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
              CGU
            </h1>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="content-page">
              
              <h2 className="text-vert font-garamond" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 1 – OBJET
              </h2>
              
              <p>Les présentes Conditions Générales d'Utilisation ont pour objet de définir les modalités et conditions d'utilisation du site internet Loire & Nature (ci-après « le Site »).</p>
              <p>En accédant et en naviguant sur le Site, l'utilisateur accepte sans réserve les présentes CGU.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 2 – ACCÈS AU SITE
              </h2>
              
              <p>Le Site est accessible gratuitement à tout utilisateur disposant d'un accès internet.</p>
              <p>Tous les frais liés à l'accès (matériel informatique, connexion, logiciels, etc.) sont à la charge de l'utilisateur.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 3 – CONTENU ET RESPONSABILITÉ
              </h2>
              
              <p>Les informations diffusées sur le Site sont données à titre indicatif et peuvent être modifiées à tout moment.</p>
              <p>Loire & Nature s'efforce de mettre à jour régulièrement le contenu mais ne saurait être tenue pour responsable en cas d'erreur, d'omission ou d'indisponibilité du Site.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 4 – PROPRIÉTÉ INTELLECTUELLE
              </h2>
              
              <p>Tous les éléments présents sur le Site (textes, images, graphismes, logos, icônes) sont la propriété exclusive de Loire & Nature, sauf mention contraire.</p>
              <p>Toute reproduction, diffusion ou exploitation sans autorisation préalable est interdite.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 5 – DONNÉES PERSONNELLES
              </h2>
              
              <p>L'utilisation du Site peut entraîner la collecte de données personnelles (via formulaires de contact ou réservation).</p>
              <p>Conformément au RGPD, l'utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses données, en écrivant à : loire.et.nature.conciergerie@gmail.com.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 6 – COOKIES
              </h2>
              
              <p>Le Site peut utiliser des cookies pour améliorer l'expérience utilisateur.</p>
              <p>L'utilisateur peut désactiver les cookies via les paramètres de son navigateur.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 7 – LOI APPLICABLE
              </h2>
              
              <p>Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents d'Orléans.</p>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}