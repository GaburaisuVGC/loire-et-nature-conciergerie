import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function MentionsLegales() {
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
              Mentions Légales
            </h1>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="content-page">
              
              <h2 className="text-vert font-garamond" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                IDENTIFICATION DE LA PERSONNE MORALE
              </h2>
              
              <p><strong>Immatriculation au RCS</strong>, numéro 000 000 000 R.C.S. Orléans</p>
              <p><strong>Code APE</strong> 7990Z - Conciergerie</p>
              <p><strong>Date d'immatriculation</strong> 24/07/2025</p>
              <p><strong>Dénomination ou raison sociale</strong> : Loire & Nature Conciergerie</p>
              <p><strong>Forme juridique</strong> Société par actions simplifiée (Société à associé unique)</p>
              <p><strong>Capital social</strong> 1 000,00 Euros</p>
              <p><strong>Adresse du siège</strong> 31 rue du Haut Thibert 45470 REBRECHIEN</p>
              <p><strong>Téléphone</strong> 07 43 53 53 31</p>
              <p><strong>Mail</strong> loire.et.nature.conciergerie@gmail.Com</p>
              <p>La Société est une SASU au capital de 1000€, immatriculée au RCS d'Orléans sous le numéro 000 000 000</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                DIRECTION, ADMINISTRATION, CONTRÔLE, ASSOCIÉS OU MEMBRES
              </h2>
              
              <p><strong>Président Nom, prénoms</strong> : VILSAINT Gladys</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                RENSEIGNEMENTS RELATIFS À L'ACTIVITÉ ET À L'ÉTABLISSEMENT PRINCIPAL
              </h2>
              
              <p><strong>Adresse de l'établissement</strong> : 31 rue du Haut Thibert 45470 REBRECHIEN</p>
              <p><strong>Nom commercial</strong> : Loire & Nature Conciergerie</p>
              <p><strong>Activité(s) exercée(s) - Activité de conciergerie</strong> : Prestation de services de conciergerie auprès des particuliers et professionnels.</p>
              <p>Location saisonnière, courte durée et longs séjours de logements meublés de tourisme (appartements, maisons, villa) avec offre de service liés à la location.</p>
              <p><strong>Date de commencement d'activité</strong> 24/07/2025</p>
              <p><strong>Adresse de l'établissement</strong> : 31 rue du Haut Thibert 45470 REBRECHIEN</p>
              <p><strong>Hébergement du site par :</strong> Netlify Inc., 2325 3rd Street, Suite 296, San Francisco, CA 94107, USA</p>
              <p>L'ensemble des éléments présents sur ce site (textes, images, graphismes, logo, icônes, etc.) sont protégés par le droit de la propriété intellectuelle.</p>
              <p><strong>Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sauf autorisation écrite préalable.</strong></p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                RESPONSABILITÉ
              </h2>
              
              <p>Loire & Nature met tout en œuvre pour offrir aux utilisateurs des informations fiables et actualisées. Toutefois, des erreurs ou omissions peuvent survenir.</p>
              <p>L'utilisateur devra donc s'assurer de l'exactitude des informations auprès de Loire & Nature et signaler toute modification du site qu'il jugerait utile.</p>
              <p>Loire & Nature n'est en aucun cas responsable de l'utilisation faite de ces informations, ni de tout préjudice direct ou indirect pouvant en découler.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                DONNÉES PERSONNELLES
              </h2>
              
              <p><strong>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, les informations collectées via le site (formulaire de contact, réservation, etc.) sont strictement destinées à l'usage interne de Loire & Nature et ne seront en aucun cas transmises à des tiers sans consentement préalable.</strong></p>
              <p>Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données personnelles.</p>
              <p>Pour exercer vos droits, merci d'adresser un email à : loire.et.nature.conciergerie@gmail.Com</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                COOKIES
              </h2>
              
              <p>Le site peut utiliser des cookies afin d'améliorer l'expérience utilisateur et à des fins de mesure d'audience.</p>
              <p>L'utilisateur peut paramétrer son navigateur pour refuser les cookies.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                DÉFINITIONS
              </h2>
              
              <p>Les termes suivants sont employés avec le sens et la portée définis ci-après :</p>
              <p><strong>CLIENT</strong> : Désigne le propriétaire (ou son Représentant) d'un logement qui a recours aux prestations de service.</p>
              <p><strong>VOYAGEUR</strong> : Désigne tout locataire de l'hébergement/logement d'un Client</p>
              <p><strong>PARTIES</strong> : Désigne Loire & Nature Conciergerie et le Client</p>
              <p><strong>HÉBERGEMENT/LOGEMENT</strong> : Désigne toute propriété résidentielle proposée à la location courte durée par un Client</p>
              <p><strong>RÉSERVATION</strong> : Désigne l'action de retenir un logement pour une durée déterminée</p>
              <p><strong>PLATEFORMES DE RÉSERVATION</strong> : Désigne toute entité, personne morale ou physique, ayant pour activité la mise en relation de Client et de Voyageurs en vue de la location d'un Hébergement</p>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}