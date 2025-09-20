import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function CGV() {
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
              CGV
            </h1>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="content-page">
              
              <h2 className="text-vert font-garamond" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 1er – OBJET ET CHAMP D'APPLICATION
              </h2>
              
              <p><strong>Les présentes conditions générales ont pour objet de définir les termes et conditions dans lesquels les Parties entendent organiser leur collaboration au titre des prestations ci-après décrites.</strong></p>
              
              <p>Le Client confie à Loire & Nature Conciergerie une mission de conciergerie dont voici le détail :</p>
              
              <p><strong>- Préparation et optimisation d'une ou plusieurs offres de location, régulières ou ponctuelles, comprenant la création des annonces, la mise en ligne et le suivi sur les principales plateformes, le paramétrage final des comptes</strong></p>
              <p>- Communication et échanges avec les différents voyageurs</p>
              <p>- Organisation et réalisation des prestations de ménage, traitement du linge, directement ou indirectement</p>
              <p>- Fourniture de paniers de bienvenue ou produits locaux (via partenaires)</p>
              <p>- Assistance et informations touristiques</p>
              <p>- Organisation du séjour des voyageurs</p>
              <p>- Services complémentaires à la demande (petit-déjeuner, réservations, etc)</p>
              <p>- Recherche, présentation et contrôle des équipements présents dans la maison</p>
              <p>- Possible prestations d'aménagement et de décoration du logement</p>
              
              <p><strong>Dans le cadre de cette mission, Loire & Nature Conciergerie s'engage à mettre ses collaborateurs à la disposition du Client si cela est nécessaire pour la bonne exécution de la mission. Cependant, lesdits salariés resteront sous l'autorité et sous la responsabilité du Prestataire pendant leur intervention chez le Client.</strong></p>
              
              <p>Loire & Nature Conciergerie est tenu à une obligation de moyens dans le cadre de l'exécution du Contrat.</p>
              
              <p><strong>Loire & Nature Conciergerie a uniquement vocation à assister le Client dans le cadre des opérations de réservation et de location temporaire de son Hébergement dans le cadre des relations avec des plateformes de réservation et avec des Voyageurs.</strong></p>
              
              <p><strong>En conséquence, Loire & Nature Conciergerie ne saurait en aucun cas être considérée comme (ni assimilée à) un gestionnaire de quelque nature que ce soit, une entreprise de réservation et/ou de location d'hébergement – au sens large – entre particuliers.</strong></p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 2 - CONDITIONS FINANCIÈRES
              </h2>
              
              <p>Les services fournis par Loire & Nature Conciergerie comprennent les prestations citées en objet (hors ameublement et décoration).</p>
              <p>Les tarifs sont indiqués sur le site (selon le choix de la formule).</p>
              <p>Les modalités de règlement sont détaillées à l'article 4 du présent contrat.</p>
              <p><strong>S'il s'agit d'un taux de commission, celui-ci n'inclut pas les frais de ménage qui seront déterminés par Loire & Nature Conciergerie en fonction de l'Appartement/Maison/Villa et de la plateforme sur laquelle l'Appartement est commercialisé.</strong></p>
              <p>Le prix est payable à la date indiquée sur la facture établie par Loire & Nature Conciergerie.</p>
              <p>Tout demande de prestation doit être confirmée par écrit (email, formulaire en ligne)</p>
              <p>La réservation est considérée comme ferme après validation par Loire & Nature Conciergerie</p>
              <p>Les tarifs des prestations sont indiqués en euros, toutes taxes comprises (TTC).</p>
              <p>Toute prestation commandée est due dans son intégralité.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 3 - FRAIS
              </h2>
              
              <p><strong>Loire & Nature Conciergerie sera en outre remboursé de tous les frais engagés dans le cadre de l'exécution du présent contrat sur présentation des justificatifs correspondants.</strong></p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 4 - MODALITÉS DE RÈGLEMENT
              </h2>
              
              <p><strong>Le règlement de l'intégralité de la facture devra s'effectuer en euros (€), en une seule fois. La facture relative à la prestation sera éditée à la fin du mois en cours et devra être acquittée par virement bancaire dans les huit (8) jours suivant la date de réception de la facture.</strong></p>
              <p><strong>Conformément à la loi n° 2008-776 du 4 août 2008, toute somme non payée dans les quinze (15) jours suivant la date d'échéance de la facture est susceptible de porter intérêt à taux égal une fois et demi le taux de l'intérêt légal, sans qu'un rappel soit nécessaire (article L.441-6 du Code de commerce). En outre des frais de recouvrement de 40 euros pourront être appliqués aux termes de l'article L.441-3 du Code de commerce.</strong></p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 5 – ASSURANCE
              </h2>
              
              <p>Le Client s'engage à prendre pour le logement une assurance couvrant ledit logement dans le cadre de location courte durée.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 6 - ÉTATS DES LIEUX
              </h2>
              
              <p>Au départ du logement, l'appartement et son mobilier devra être dans le même état que celui constaté le jour de l'entrée dans les lieux.</p>
              <p><strong>Loire & Nature Conciergerie ne peut pas toujours procéder personnellement à la vérification des lieux et de l'inventaire en présence du voyageur. L'état des lieux est systématiquement réalisé après le départ du voyageur occupant et avant l'arrivée du voyageur suivant, ou en cas de non reprise, dans les 48 heures.</strong></p>
              <p><strong>Loire & Nature Conciergerie prendra ou fera prendre par la plateforme de commercialisation, pour le logement du Client, une caution auprès des différents locataires visant à prémunir le Client de dommages qui seraient causés par ces locataires.</strong></p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 7 – DURÉE DU CONTRAT
              </h2>
              
              <p><strong>Le présent contrat est conclu pour une durée de six mois, reconductible tacitement. Chaque Partie pourra y mettre fin, moyennant la notification de sa volonté à l'autre Partie par courrier recommandé avec demande d'avis de réception outre le respect d'un délai de préavis d'un mois.</strong></p>
              <p>L'ensemble des prestations réalisées seront réglées par le Client selon le tarif en vigueur.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 8 – CLAUSE DE RÉSILIATION
              </h2>
              
              <p><strong>Si l'une ou l'autre des Parties venait à manquer à l'une ou l'autre de ses obligations et si ledit manquement venait à persister à l'expiration d'un délai de 15 (quinze) jours suivant une mise en demeure par lettre recommandée avec avis de réception restée sans effets, le présent contrat pourra être résilié avec effet immédiat, tous dommages-intérêts éventuels demeurant réservés.</strong></p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 9 – FORCE MAJEURE ET ÉVÉNEMENTS EXTÉRIEURS
              </h2>
              
              <p><strong>Sont considérés comme cas de force majeure, ceux retenus habituellement par la jurisprudence des cours et tribunaux français et qui revêtent un caractère imprévisible, insurmontable et extérieur.</strong></p>
              <p><strong>Si l'un des éléments essentiels du Contrat de prestation de services ne peut plus être fourni par suite d'un événement de force majeure ou extérieur au Prestataire, il doit le plus rapidement possible en aviser le Client. Dans un premier temps les cas de force majeure suspendront l'exécution du Contrat affecté par ceux-ci. Si les cas de force majeure ont une durée d'existence supérieure à quinze jours, les Parties se réuniront afin de déterminer les modalités de poursuites de leurs relations. Si le/les cas de force majeure ont une durée supérieure à trois mois, le Contrat considéré sera résilié de plein droit et sans formalité.</strong></p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 10 – CONFIDENTIALITÉ
              </h2>
              
              <p><strong>Chacune des Parties s'engage à ne pas communiquer à quelque tiers que ce soit, directement ou par personne interposée, en totalité ou en partie, les informations confidentielles de l'autre Partie dont elle aurait eu ainsi connaissance, à l'exception de ses employés ou sous-traitants ayant besoin des informations pour l'exécution de leurs obligations.</strong></p>
              <p><strong>Chaque Partie s'engage à ne pas utiliser les informations confidentielles de l'autre Partie dans un cadre autre que celui de l'exécution du présent Contrat, et en particulier à ne pas les utiliser pour son propre compte sauf ce que les présentes prévoient.</strong></p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 11 – RÈGLEMENT DES LITIGES
              </h2>
              
              <p><strong>Au cas où un différend surviendrait entre les Parties dans l'exécution ou l'interprétation de la présente convention, les Parties s'obligent à tenter de le résoudre préalablement de façon amiable.</strong></p>
              <p>Si au terme d'un délai de 15 jours les Parties n'arrivent pas à se mettre d'accord, le différend sera alors soumis aux tribunaux compétents.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 12 – ANNULATION ET MODIFICATION
              </h2>
              
              <p><strong>En cas d'annulation par le client :</strong></p>
              <p>Moins de 48h avant la prestation : facturation de 100% du prix.</p>
              <p>Plus de 48h avant la prestation : facturation de 30% du prix.</p>
              <p>En cas d'annulation exceptionnelle par Loire & Nature (force majeure), les sommes perçues seront intégralement remboursées.</p>

              <h2 className="text-vert font-garamond mt-5" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2rem' }}>
                Article 13 – RESPONSABILITÉ
              </h2>
              
              <p>Loire & Nature agit comme intermédiaire avec des prestataires (ménage, linge, produits locaux).</p>
              <p>Sa responsabilité ne saurait être engagée en cas de mauvaise exécution imputable à ces prestataires.</p>
              <p>Le client est responsable de l'utilisation normale et raisonnable des lieux loués.</p>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}