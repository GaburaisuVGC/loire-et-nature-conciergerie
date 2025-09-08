import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <div className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h1 className="text-primary-custom mb-3">À Propos de Nous</h1>
              <p className="lead">
                Loire & Nature Conciergerie, votre partenaire de confiance pour la
                gestion et l'entretien de vos propriétés en Loire-Atlantique.
              </p>
            </div>

            <Row className="mb-5">
              <Col md={6}>
                <h3 className="text-secondary-custom mb-3">Notre Histoire</h3>
                <p>
                  Fondée par des passionnés de la région Loire-Atlantique, notre
                  entreprise est née de la volonté de proposer des services de
                  conciergerie haut de gamme dans le respect de l'environnement
                  naturel exceptionnel de notre territoire.
                </p>
                <p>
                  Depuis nos débuts, nous avons développé une expertise reconnue
                  dans la gestion de propriétés de vacances, alliant savoir-faire
                  traditionnel et innovations modernes pour offrir à nos clients un
                  service irréprochable.
                </p>
              </Col>
              <Col md={6}>
                <h3 className="text-secondary-custom mb-3">Nos Valeurs</h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong className="text-primary-custom">Excellence :</strong>{" "}
                    Nous nous engageons à fournir des services de qualité
                    supérieure.
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary-custom">Proximité :</strong>{" "}
                    Une approche locale et personnalisée pour chaque client.
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary-custom">Durabilité :</strong>{" "}
                    Respect de l'environnement dans toutes nos interventions.
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary-custom">Confiance :</strong>{" "}
                    Transparence et fiabilité dans nos relations clients.
                  </li>
                </ul>
              </Col>
            </Row>

            <div className="text-center bg-rose-custom p-4 rounded">
              <h4 className="text-primary-custom mb-3">Notre Mission</h4>
              <p className="mb-0">
                Préserver et valoriser vos biens immobiliers tout en contribuant à
                la beauté et à la préservation de notre magnifique région
                Loire-Atlantique.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
