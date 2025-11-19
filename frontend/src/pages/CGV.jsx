import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function CGV() {
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
              CGV
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
                Article 1 – OBJET ET CHAMP D’APPLICATION
              </h2>

              <p>
                <strong>
                  « Les présentes conditions générales ont pour objet de définir
                  les termes et conditions dans lesquels les Parties entendent
                  organiser leur collaboration au titre des prestations ci-après
                  décrites. »
                </strong>
              </p>

              <p>
                Le Client confie à Loire & Nature Conciergerie une mission de
                conciergerie dont voici le détail :
              </p>

              <p>
                <strong>
                  « - Préparation et optimisation d’une ou plusieurs offres de
                  location, régulières ou ponctuelles, comprenant la création
                  des annonces, la mise en ligne et le suivi sur les principales
                  plateformes, le paramétrage final des comptes »
                </strong>
              </p>
              <p>- Communication et échanges avec les différents voyageurs</p>
              <p>
                - Organisation et réalisation des prestations de ménage,
                traitement du linge, directement ou indirectement
              </p>
              <p>
                - Fourniture de paniers de bienvenue ou produits locaux (via
                partenaires)
              </p>
              <p>- Assistance et informations touristiques</p>
              <p>- Organisation du séjour des voyageurs</p>
              <p>
                - Services complémentaires à la demande (petit-déjeuner,
                réservations, etc.)
              </p>
              <p>
                - Recherche, présentation et contrôle des équipements présents
                dans la maison
              </p>
              <p>
                - Possible prestations d’aménagement et de décoration du
                logement
              </p>

              <p>
                <strong>
                  « Dans le cadre de cette mission, Loire & Nature Conciergerie
                  s'engage à mettre ses collaborateurs à disposition du Client
                  si cela est nécessaire pour la bonne exécution de la mission.
                  Cependant, lesdits salariés resteront sous l’autorité et sous
                  la responsabilité du Prestataire pendant leur intervention
                  chez le Client. »
                </strong>
              </p>

              <p>
                Loire & Nature Conciergerie est tenue à une obligation de moyens
                et non de résultat.
              </p>

              <p>
                <strong>
                  « Loire & Nature Conciergerie a uniquement vocation à assister
                  le Client dans le cadre des opérations de réservation et de
                  location temporaire de son Hébergement dans le cadre des
                  relations avec des plateformes de réservation et avec des
                  Voyageurs. »
                </strong>
              </p>

              <p>
                <strong>
                  « Loire & Nature Conciergerie exerce en tant qu’entreprise de
                  services aux propriétaires dans le cadre de la location
                  saisonnière. Elle n’est pas titulaire d’une carte
                  professionnelle d’agent immobilier et n’encaisse en aucun cas
                  les loyers pour le compte du Client. »
                </strong>
              </p>

              <p>
                <strong>
                  « En conséquence, Loire & Nature Conciergerie ne saurait en
                  aucun cas être considérée comme (ni assimilée à) un
                  gestionnaire de quelque nature que ce soit, une entreprise de
                  réservation et/ou de location d’hébergement – au sens large –
                  entre particuliers. »
                </strong>
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
                Article 2 – CONDITIONS FINANCIÈRES
              </h2>

              <p>
                Les services fournis comprennent les prestations citées en objet
                (hors ameublement et décoration).
              </p>
              <p>
                Les tarifs sont indiqués sur le site selon la formule choisie.
              </p>
              <p>Les modalités de règlement sont détaillées à l'article 4.</p>

              <p>
                <strong>
                  « S’il s’agit d’un taux de commission, celui-ci n’inclut pas
                  les frais de ménage… »
                </strong>
              </p>

              <p>La réservation est ferme après validation.</p>
              <p>
                Les prix sont indiqués TTC. Toute prestation entamée est due
                dans son intégralité.
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
                Article 3 – FRAIS
              </h2>

              <p>
                <strong>
                  « Les frais engagés par Loire & Nature Conciergerie […] ne
                  pourront être remboursés qu’après accord préalable du Client
                  et sur présentation de justificatifs. »
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
                Article 4 – MODALITÉS DE RÈGLEMENT
              </h2>

              <p>
                <strong>
                  « Le règlement de l'intégralité de la facture devra
                  s'effectuer en euros… »
                </strong>
              </p>

              <p>
                <strong>
                  « Toute somme non payée dans les quinze jours… »
                </strong>
              </p>

              <p>Le Client accepte expressément la facturation électronique.</p>
              <p>
                Le Client s’engage à assurer le logement en location courte
                durée.
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
                Article 5 – ASSURANCE
              </h2>

              <p>
                <strong>
                  « Loire & Nature Conciergerie déclare être titulaire d’une
                  assurance RC Pro […] Le Client doit également justifier d’une
                  assurance multirisque habitation adaptée. »
                </strong>
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
                Article 6 – ÉTATS DES LIEUX
              </h2>

              <p>Le logement doit être restitué dans l’état initial.</p>
              <p>
                <strong>
                  « L’état des lieux est systématiquement réalisé après le
                  départ du voyageur… »
                </strong>
              </p>
              <p>
                <strong>
                  « La caution est prélevée via la plateforme… Loire & Nature ne
                  détient aucune somme. »
                </strong>
              </p>
              <p>En cas de dégradation, preuves transmises au Client.</p>

              {/* ARTICLE 7 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 7 – DURÉE DU CONTRAT
              </h2>

              <p>
                <strong>
                  « Contrat de six mois renouvelable tacitement… préavis d’un
                  mois. »
                </strong>
              </p>

              {/* ARTICLE 8 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 8 – CLAUSE DE RÉSILIATION
              </h2>

              <p>
                <strong>
                  « Mise en demeure de 15 jours… résiliation immédiate possible.
                  »
                </strong>
              </p>

              {/* ARTICLE 9 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 9 – FORCE MAJEURE ET ÉVÉNEMENTS EXTÉRIEURS
              </h2>

              <p>
                <strong>
                  Liste des cas de force majeure + procédure en cas
                  d’impossibilité d’exécution.
                </strong>
              </p>

              {/* ARTICLE 10 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 10 – CONFIDENTIALITÉ CONTRACTUELLE
              </h2>

              <p>
                <strong>
                  Engagement de non-divulgation et d’usage exclusif dans le
                  cadre du contrat.
                </strong>
              </p>

              {/* ARTICLE 11 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 11 – RÈGLEMENT DES LITIGES
              </h2>

              <p>
                <strong>
                  Procédure amiable puis compétence du Tribunal d’Orléans.
                </strong>
              </p>

              {/* ARTICLE 12 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 12 – ANNULATION ET MODIFICATION
              </h2>

              <p>Moins de 48h : 100% facturé.</p>
              <p>Plus de 48h : 30% facturé.</p>
              <p>Annulation par Loire & Nature : remboursement intégral.</p>

              {/* ARTICLE 13 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 13 – RESPONSABILITÉ
              </h2>

              <p>
                <strong>
                  Responsabilité limitée, uniquement en cas de faute prouvée et
                  directe.
                </strong>
              </p>

              {/* ARTICLE 14 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 14 – SOUS-TRAITANCE
              </h2>

              <p>
                Loire & Nature peut faire appel à des prestataires externes mais
                en reste responsable.
              </p>

              {/* ARTICLE 15 */}
              <h2
                className="text-vert font-garamond mt-5"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                Article 15 – CLAUSE DE NON-SOLLICITATION
              </h2>

              <p>
                Le Client ne peut pas employer ou contracter avec les
                prestataires ou collaborateurs pendant le contrat + 12 mois.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
