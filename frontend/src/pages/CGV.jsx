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
              <h2 className="text-vert font-garamond" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 1 – OBJET ET CHAMP D’APPLICATION
              </h2>

              <p>
                « Les présentes conditions générales ont pour objet de définir les termes et conditions dans lesquels
                les Parties entendent organiser leur collaboration au titre des prestations ci-après décrites. »
              </p>

              <p>
                Le Client confie à Loire & Nature Conciergerie une mission de conciergerie dont voici le détail :
              </p>

              <p>
                « - Préparation et optimisation d’une ou plusieurs offres de location, régulières ou ponctuelles,
                comprenant la création des annonces, la mise en ligne et le suivi sur les principales plateformes,
                le paramétrage final des comptes »
              </p>

              <p>- Communication et échanges avec les différents voyageurs</p>
              <p>- Organisation et réalisation des prestations de ménage, traitement du linge, directement ou indirectement</p>
              <p>- Fourniture de paniers de bienvenue ou produits locaux (via partenaires)</p>
              <p>- Assistance et informations touristiques</p>
              <p>- Organisation du séjour des voyageurs</p>
              <p>- Services complémentaires à la demande (petit-déjeuner, réservations, etc)</p>
              <p>- Recherche, présentation et contrôle des équipements présents dans la maison</p>
              <p>- Possible prestations d’aménagement et de décoration du logement</p>

              <p>
                « Dans le cadre de cette mission, Loire & Nature Conciergerie s'engage à mettre ses collaborateurs à la disposition du Client
                si cela est nécessaire pour la bonne exécution de la mission. Cependant, lesdits salariés resteront sous l'autorité et
                sous la responsabilité du Prestataire pendant leur intervention chez le Client. »
              </p>

              <p>Loire & Nature Conciergerie est tenue à une obligation de moyens et non de résultat, ce que le Client reconnaît expressément.</p>

              <p>
                « Loire & Nature Conciergerie a uniquement vocation à assister le Client dans le cadre des opérations de réservation et de location
                temporaire de son Hébergement dans le cadre des relations avec des plateformes de réservation et avec des Voyageurs. »
              </p>

              <p>
                « Loire & Nature Conciergerie exerce en tant qu’entreprise de services aux propriétaires dans le cadre de la location saisonnière.
                Elle n’est pas titulaire d’une carte professionnelle d’agent immobilier et n’encaisse en aucun cas les loyers pour le compte du Client. »
              </p>

              <p>
                « En conséquence, Loire & Nature Conciergerie ne saurait en aucun cas être considérée comme (ni assimilée à)
                un gestionnaire de quelque nature que ce soit, une entreprise de réservation et/ou de location d’hébergement – au sens large – entre particuliers. »
              </p>

              {/* ARTICLE 2 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 2 – CONDITIONS FINANCIÈRES
              </h2>

              <p>
                Les services fournis par Loire & Nature Conciergerie comprennent les prestations citées en objet (hors ameublement et décoration).
              </p>
              <p>Les tarifs sont indiqués sur le site (selon le choix de la formule).</p>
              <p>Les modalités de règlement sont détaillées à l'article 4 du présent contrat.</p>

              <p>
                « S’il s’agit d’un taux de commission, celui-ci n’inclut pas les frais de ménage qui seront déterminés par Loire & Nature Conciergerie
                en fonction de l’Appartement/Maison/Villa et de la plateforme sur laquelle l’Appartement est commercialisé. »
              </p>

              <p>Le prix est payable à la date indiquée sur la facture établie par Loire & Nature Conciergerie.</p>
              <p>Toute demande de prestation doit être confirmée par écrit (email, formulaire en ligne).</p>
              <p>La réservation est considérée comme ferme après validation par Loire & Nature Conciergerie.</p>
              <p>Les tarifs sont indiqués en euros, toutes taxes comprises (TTC).</p>
              <p>Toute prestation entamée est due dans son intégralité, sauf annulation dans les conditions prévues à l’article 12.</p>

              {/* ARTICLE 3 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 3 – FRAIS
              </h2>

              <p>
                « Les frais engagés par Loire & Nature Conciergerie (produits d’entretien, déplacements, consommables, achats pour compte du Client, etc.)
                ne pourront être remboursés qu’après accord préalable du Client et sur présentation de justificatifs »
              </p>

              {/* ARTICLE 4 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 4 – MODALITÉS DE RÈGLEMENT
              </h2>

              <p>
                « Le règlement de l'intégralité de la facture devra s'effectuer en euros (€), en une seule fois.
                La facture relative à la prestation sera éditée à la fin du mois en cours
                et devra être acquittée par virement bancaire dans les huit (8) jours suivant la date de réception de la facture. »
              </p>

              <p>
                « Conformément à la loi n° 2008-776 du 4 août 2008, toute somme non payée dans les quinze (15) jours suivant la date d'échéance
                de la facture est susceptible de porter intérêt à taux égal une fois et demi le taux de l'intérêt légal, sans qu'un rappel soit nécessaire
                (article L.441-10 du Code de commerce). En outre des frais de recouvrement de 40 euros pourront être appliqués
                aux termes de l'article L.441-3 du Code de commerce. »
              </p>

              <p>Le Client accepte expressément de recevoir les factures par voie électronique.</p>
              <p>Le Client s’engage à prendre pour le logement une assurance couvrant ledit logement dans le cadre de location courte durée.</p>

              {/* ARTICLE 5 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 5 – ASSURANCE
              </h2>

              <p>
                « Loire & Nature Conciergerie déclare être titulaire d’une assurance Responsabilité Civile Professionnelle couvrant ses activités.
                Le Client doit également justifier d’une assurance multirisque habitation adaptée à la location saisonnière. »
              </p>

              {/* ARTICLE 6 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 6 – ÉTATS DES LIEUX
              </h2>

              <p>Au départ du logement, l’appartement et son mobilier devra être dans le même état que celui constaté le jour de l’entrée dans les lieux.</p>

              <p>
                « Loire & Nature Conciergerie ne peut pas toujours procéder personnellement à la vérification des lieux et de l’inventaire en présence du voyageur.
                L’état des lieux est systématiquement réalisé après le départ du voyageur occupant et avant l'arrivée du voyageur suivant,
                ou en cas de non reprise, dans les 48 heures. »
              </p>

              <p>
                « La caution est prélevée directement via la plateforme de réservation (Airbnb, Booking, etc.).
                Loire & Nature Conciergerie ne perçoit ni ne détient aucune somme d’argent pour le compte du Client.
                Elle assiste le Client dans le suivi et la gestion des éventuelles réclamations liées à la caution. »
              </p>

              <p>
                En cas de dégradation constatée, Loire & Nature Conciergerie informera le Client par écrit
                et transmettra les preuves nécessaires (photos, témoignages, factures).
              </p>

              {/* ARTICLE 7 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                ARTICLE 7 – DURÉE DU CONTRAT
              </h2>

              <p>
                « Le présent contrat est conclu pour une durée de six mois, reconductible tacitement.
                Chaque Partie pourra y mettre fin, moyennant la notification de sa volonté́ à l’autre Partie
                par courrier recommandé avec demande d’avis de réception outre le respect d’un délai de préavis d’un mois. »
              </p>

              <p>L’ensemble des prestations réalisées seront réglées par le Client selon le tarif en vigueur.</p>

              {/* ARTICLE 8 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 8 – CLAUSE DE RÉSILIATION
              </h2>

              <p>
                « Si l’une ou l’autre des Parties venait à manquer à l'une ou l'autre de ses obligations et si ledit manquement venait à persister
                à l'expiration d'un délai de 15 (quinze) jours suivant une mise en demeure par lettre recommandée
                avec avis de réception restée sans effets, le présent contrat pourra être résilié avec effet immédiat,
                tous dommages-intérêts éventuels demeurant réservés. »
              </p>

              {/* ARTICLE 9 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 9 – FORCE MAJEURE ET ÉVÉNEMENTS EXTÉRIEURS
              </h2>

              <p>
                « Sont considérés comme cas de force majeure, ceux retenus habituellement par la jurisprudence des cours et tribunaux
                français et qui revêtent un caractère imprévisible, insurmontable et extérieur : catastrophes naturelles, pandémie,
                décision administrative interdisant la location, panne électrique majeure, grève nationale. »
              </p>

              <p>
                « Si l’un des éléments essentiels du Contrat de prestation de services ne peut plus être fourni par suite d’un événement de force majeure
                ou extérieur au Prestataire, il doit le plus rapidement possible en aviser le Client. Dans un premier temps les cas de force majeure
                suspendront l’exécution du Contrat affecté par ceux-ci. Si les cas de force majeure ont une durée d’existence supérieure à quinze jours,
                les Parties se réuniront afin de déterminer les modalités de poursuites de leurs relations. Si le/les cas de force majeure ont
                une durée supérieure à trois mois, le Contrat considéré sera résilié de plein droit et sans formalité. »
              </p>

              {/* ARTICLE 10 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 10 – CONFIDENTIALITÉ CONTRACTUELLE
              </h2>

              <p>
                « Chacune des Parties s’engage à ne pas communiquer à quelque tiers que ce soit, directement ou par personne interposée,
                en totalité ou en partie, les informations confidentielles de l’autre Partie dont elle aurait eu ainsi connaissance,
                à l’exception de ses employés ou sous-traitants ayant besoin des informations pour l’exécution de leurs obligations. »
              </p>

              <p>
                « Chaque Partie s’engage à ne pas utiliser les informations confidentielles de l’autre Partie dans un cadre autre que celui
                de l’exécution du présent Contrat, et en particulier à ne pas les utiliser pour son propre compte sauf ce que les présentes prévoient. »
              </p>

              {/* ARTICLE 11 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 11 – RÈGLEMENT DES LITIGES
              </h2>

              <p>
                « Au cas où un différend surviendrait entre les Parties dans l'exécution ou l'interprétation de la présente convention,
                les Parties s'obligent à tenter de le résoudre préalablement de façon amiable. »
              </p>

              <p>
                Si au terme d'un délai de 15 jours les Parties n'arrivent pas à se mettre d'accord, le différend sera alors soumis aux tribunaux compétents.
              </p>

              <p>
                Le présent contrat est régi par le droit français.
                En cas de litige, compétence expresse est attribuée au Tribunal d’Orléans, même en cas de pluralité de défendeurs.
              </p>

              {/* ARTICLE 12 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 12 – ANNULATION ET MODIFICATION
              </h2>

              <p>
                En cas d’annulation par le Client moins de 48h avant la prestation, Loire & Nature Conciergerie conserve 100 % du montant prévu,
                sauf cas de force majeure dûment justifié.
              </p>

              <p>Plus de 48h avant la prestation : facturation de 30% du prix.</p>

              <p>
                En cas d’annulation exceptionnelle par Loire & Nature (force majeure), les sommes perçues seront intégralement remboursées.
              </p>

              {/* ARTICLE 13 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 13 – RESPONSABILITÉ
              </h2>

              <p>
                « Loire & Nature Conciergerie agit comme intermédiaire entre le Client et les prestataires (ménage, linge, maintenance).
                Sa responsabilité ne pourra être engagée qu’en cas de faute prouvée et directe dans l’exécution de ses obligations.
                En tout état de cause, la responsabilité de Loire & Nature Conciergerie est limitée au montant total des sommes perçues au titre du contrat
                sur les 12 derniers mois. Elle ne pourra être tenue responsable des pertes d’exploitation, préjudices indirects,
                ou des dommages imputables aux voyageurs ou aux plateformes. »
              </p>

              {/* ARTICLE 14 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 14 – SOUS-TRAITANCE
              </h2>

              <p>
                « Loire & Nature Conciergerie peut faire appel à des prestataires externes pour l’exécution de ses missions (ménage, linge, produits).
                Elle demeure responsable de leur bonne exécution vis-à-vis du Client. »
              </p>

              {/* ARTICLE 15 */}
              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight:"bold", fontStyle:"italic", marginBottom:"2rem" }}>
                Article 15 – CLAUSE DE NON-SOLLICITATION
              </h2>

              <p>
                Le Client s’interdit, pendant la durée du contrat et dans les 12 mois suivant sa cessation,
                d’employer ou de contracter directement avec tout sous-traitant ou collaborateur présenté par Loire & Nature Conciergerie.
              </p>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
