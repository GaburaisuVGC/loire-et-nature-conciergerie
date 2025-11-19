import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function CGU() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundColor: "var(--rose-pale)",
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <div className="hero-content text-center">
            <h1
              className="font-garamond text-vert hero-title"
              style={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              CGU
            </h1>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="content-page">
              {/* ARTICLE 1 */}
              <h2
                className="text-vert font-garamond"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 1 – OBJET
              </h2>

              <p>
                Les présentes Conditions Générales d’Utilisation ont pour objet
                de définir les modalités et conditions d’utilisation du site
                internet Loire & Nature (ci-après « le Site »).
              </p>

              <p>
                En accédant et en naviguant sur le Site, l’utilisateur accepte
                sans réserve les présentes CGU.
              </p>

              <p>
                <strong>
                  Loire & Nature se réserve le droit de modifier à tout moment
                  les présentes CGU.
                </strong>
                <br />
                Les utilisateurs seront invités à les consulter régulièrement.
                Les CGU applicables sont celles en vigueur à la date de la
                navigation sur le Site.
              </p>

              {/* ARTICLE 2 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 2 – ACCÈS AU SITE
              </h2>

              <p>
                Le Site est accessible gratuitement à tout utilisateur disposant
                d’un accès internet.
              </p>
              <p>
                Tous les frais liés à l’accès (matériel informatique, connexion,
                logiciels, etc.) sont à la charge de l’utilisateur.
              </p>

              <p>
                Loire & Nature s’efforce d’assurer un accès continu au Site,
                <strong>
                  mais ne saurait être tenue responsable d’éventuelles
                  interruptions, maintenances ou dysfonctionnements
                </strong>
                , quelle qu’en soit la cause.
              </p>

              {/* ARTICLE 3 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 3 – CONTENU ET RESPONSABILITÉ
              </h2>

              <p>
                Les informations diffusées sur le Site sont données à titre
                indicatif et peuvent être modifiées à tout moment.
              </p>

              <p>
                Loire & Nature s’efforce de mettre à jour régulièrement le
                contenu mais ne saurait être tenue pour responsable en cas
                d’erreur, d’omission ou d’indisponibilité du Site.
              </p>

              <p>
                Le Site peut contenir des liens vers des sites tiers sur
                lesquels Loire & Nature n’exerce aucun contrôle.
                <strong>
                  Loire & Nature décline toute responsabilité quant aux contenus
                  de ces sites.
                </strong>
              </p>

              {/* ARTICLE 4 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 4 – PROPRIÉTÉ INTELLECTUELLE
              </h2>

              <p>
                Les règles relatives à la propriété intellectuelle du Site
                figurent dans les Mentions légales.
              </p>

              {/* ARTICLE 5 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 5 – PROTECTION DES DONNÉES PERSONNELLES
              </h2>

              <p>
                L’utilisation du Site peut entraîner la collecte de données
                personnelles (via formulaires de contact ou réservation).
              </p>

              <p>
                Loire & Nature Conciergerie traite les données personnelles
                strictement nécessaires à l’exécution de ses missions. Ces
                données ne sont pas transmises à des tiers non autorisés et sont
                conservées pendant la durée du contrat + 1 an.
              </p>

              <p>
                Conformément au RGPD, toute personne dispose d’un droit d’accès,
                de rectification et de suppression via l’adresse :{" "}
                <strong>loireetnatureconciergerie@gmail.com</strong>
              </p>

              {/* ARTICLE 6 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 6 – COOKIES
              </h2>

              <p>
                Le Site peut utiliser des cookies pour améliorer l’expérience
                utilisateur.
              </p>
              <p>
                L’utilisateur peut désactiver les cookies via les paramètres de
                son navigateur.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
