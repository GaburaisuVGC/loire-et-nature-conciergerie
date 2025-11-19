import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function MentionsLegales() {
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
              Mentions Légales
            </h1>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="content-page">
              {/* --- IDENTIFICATION --- */}
              <h2
                className="text-vert font-garamond"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                IDENTIFICATION DE LA PERSONNE MORALE
              </h2>

              <p>
                <strong>Immatriculation au RCS</strong>, numéro 399 385 236
                00050 R.C.S. Orléans
              </p>
              <p>
                <strong>Code APE</strong> 9499Z
              </p>
              <p>
                <strong>Date d'immatriculation</strong> Sous CAPE
              </p>
              <p>
                <strong>Dénomination ou raison sociale</strong> : PES45 / Loire & Nature Conciergerie
              </p>
              <p>
                <strong>Forme juridique</strong> : Association loi 1901
              </p>
              <p>
                <strong>N° de TVA Intracommunautaire</strong> FR80 399 385 236
              </p>
              <p>
                <strong>Cadre légal du CAPE</strong> : Loi 2003-721 du 1er août
                2003, dite loi Dutreil sur l'initiative économique (art. 20 et
                21)
              </p>
              <p>
                <strong>Adresse du siège</strong> : 31 rue du Haut Thibert 45470
                REBRECHIEN
              </p>
              <p>
                <strong>Téléphone</strong> : 07 43 53 53 31
              </p>
              <p>
                <strong>Mail</strong> : loireetnatureconciergerie@gmail.com
              </p>

              {/* --- DIRECTION --- */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                DIRECTION, ADMINISTRATION, CONTRÔLE, ASSOCIÉS OU MEMBRES
              </h2>

              <p>
                <strong>Président Nom, prénoms</strong> : VILSAINT Gladys
              </p>

              {/* --- ACTIVITÉ --- */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                RENSEIGNEMENTS RELATIFS À L'ACTIVITÉ ET À L'ÉTABLISSEMENT
                PRINCIPAL
              </h2>

              <p>
                <strong>Adresse de l'établissement</strong> : 31 rue du Haut
                Thibert 45470 REBRECHIEN
              </p>
              <p>
                <strong>Nom commercial</strong> : Loire&Nature Conciergerie
              </p>
              <p>
                <strong>Activité(s) exercée(s)</strong> – Activité de
                conciergerie : Prestation de services de conciergerie auprès des
                particuliers et professionnels.
              </p>
              <p>
                Location saisonnière, courte durée et longs séjours de logements
                meublés de tourisme (appartements, maisons, villa) avec offre de
                services liés à la location.
              </p>
              <p>
                <strong>Date de commencement d'activité</strong> : 01/11/2025
              </p>

              <p>
                <strong>Hébergement du site par : </strong> Netlify Inc., 2325
                3rd Street, Suite 296, San Francisco, CA 94107, USA
              </p>

              <p>
                <strong>
                  Tous les éléments présents sur le Site (textes, images,
                  graphismes, logos, icônes) sont la propriété exclusive de
                  Loire & Nature, sauf mention contraire. Toute reproduction,
                  diffusion ou exploitation sans autorisation préalable est
                  interdite.
                </strong>
              </p>

              {/* --- DONNÉES PERSONNELLES --- */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                DONNÉES PERSONNELLES
              </h2>

              <p>Le traitement des données personnelles est décrit dans les CGU.</p>

              {/* --- COOKIES --- */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                COOKIES
              </h2>

              <p>
                Le site peut utiliser des cookies afin d’améliorer l’expérience
                utilisateur et à des fins de mesure d’audience. L’utilisateur
                peut paramétrer son navigateur pour refuser les cookies.
              </p>

              {/* --- DÉFINITIONS --- */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                DÉFINITIONS
              </h2>

              <p>
                <strong>CLIENT</strong> : Désigne le propriétaire (ou son
                Représentant) d’un logement qui a recours aux prestations de
                service.
              </p>
              <p>
                <strong>VOYAGEUR</strong> : Désigne tout locataire de
                l’hébergement/logement d’un Client.
              </p>
              <p>
                <strong>PARTIES</strong> : Désigne Loire & Nature Conciergerie
                et le Client.
              </p>
              <p>
                <strong>HÉBERGEMENT / LOGEMENT</strong> : Désigne toute
                propriété résidentielle proposée à la location courte durée par
                un Client.
              </p>
              <p>
                <strong>RÉSERVATION</strong> : Désigne l’action de retenir un
                logement pour une durée déterminée.
              </p>
              <p>
                <strong>PLATEFORMES DE RÉSERVATION</strong> : Désigne toute
                entité, personne morale ou physique, ayant pour activité la mise
                en relation de Clients et de Voyageurs en vue de la location
                d’un Hébergement.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
