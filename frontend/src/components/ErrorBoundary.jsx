import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ErrorBoundary({ error }) {
  const is404 = error?.message === "404";

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col lg={6}>
          {is404 ? (
            <>
              <div className="mb-4">
                <span style={{ fontSize: '4rem' }}>🏠</span>
              </div>
              <h1 className="display-4 text-primary-custom mb-3">404</h1>
              <h2 className="mb-3">Page non trouvée</h2>
              <p className="lead text-muted mb-4">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </p>
              <div>
                <Button as={Link} to="/" className="btn-primary me-3">
                  <i className="bi bi-house-door me-2"></i>
                  Retour à l'accueil
                </Button>
                <Button as={Link} to="/reservations" variant="outline-primary">
                  <i className="bi bi-calendar-check me-2"></i>
                  Voir nos logements
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <span style={{ fontSize: '4rem' }}>⚠️</span>
              </div>
              <h1 className="display-4 text-danger mb-3">Erreur</h1>
              <h2 className="mb-3">Une erreur est survenue</h2>
              <p className="lead text-muted mb-4">
                Nous nous excusons pour la gêne occasionnée. 
                Veuillez réessayer ou nous contacter si le problème persiste.
              </p>
              <div>
                <Button as={Link} to="/" className="btn-primary me-3">
                  <i className="bi bi-house-door me-2"></i>
                  Retour à l'accueil
                </Button>
                <Button as={Link} to="/contact" variant="outline-primary">
                  <i className="bi bi-envelope me-2"></i>
                  Nous contacter
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}