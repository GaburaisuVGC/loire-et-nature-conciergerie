import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotreDemarche() {

  const metrics = [
    { value: "15", label: "Logements" },
    { value: "890", label: "Nuits réservées" },
    { value: "92%", label: "Taux d'occupation" },
    { value: "4.8/5", label: "Satisfaction client" }
  ];

  return (
    <>
      <section 
        className="hero-section"
        style={{
          backgroundImage: `url('/hero-image2.jpg')`,
          backgroundColor: '#D8CBB5',
            backgroundSize: 'fill',
        }}
      >
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content">
            <h1 className="font-garamond text-vert hero-title">
              Notre Conciergerie responsable, au service du territoire
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="section-title">
            <h2>Notre engagement</h2>
          </div>

          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="engagement-content">
                <p className="mb-4">
                  <strong>Loire & Nature</strong>, c'est un projet de cœur, né d'une volonté d'associer gestion locative et faire 
                  découvrir aux voyageurs des produits de fabrication artisanale de la région.
                </p>
                <p className="mb-4">
                  Nous proposons un service clés en main aux propriétaires afin de faciliter et optimiser 
                  la gestion locative des logements en location de courte durée type Airbnb, booking...
                </p>
                <p className="mb-5">
                  Nous intervenons sur l'agglomération Orléanaise et des communes environnantes 
                  (Mardié, Chécy, Combleux, La Chapelle Saint Mesmin et autres)
                </p>

                <div className="text-center">
                  <Link to="/contact" className="btn-custom-vert">
                    Prendre rendez-vous
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-rose-pale">
        <Container>
          <Row className="metrics-container">
            {metrics.map((metric, index) => (
              <Col 
                key={index} 
                xs={6} 
                md={3} 
                className="metric-item text-center mb-4 mb-md-0"
              >
                <div className="metric-value font-garamond text-vert">
                  {metric.value}
                </div>
                <div className="metric-label text-beige">
                  {metric.label}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="gladys-content">
                <p className="mb-4">
                  Je suis <strong>Gladys</strong> et j'ai créé Loire & Nature Conciergerie en 2024 pour relier mes passions et savoir faire :
                </p>
                <p className="mb-4">
                  L'organisation, l'accueil, l'aménagement et le souhait de devenir actrice dans la valorisation du territoire...
                </p>
                <p className="mb-4">
                  Issue d'un parcours administratif et comptable de 20 ans d'expérience dans le secteur du bâtiment,
                  je suis profondément attachée à la qualité des services et prestations dans un cadre de bienveillance.
                </p>
                <p className="mb-4">
                  Aujourd'hui je souhaite mettre mon énergie et mes compétences au service 
                  de votre bien et de ceux qui y séjournent.
                </p>
                
                <div className="signature text-end">
                  <p className="font-garamond text-vert mb-0 fs-5">
                    Gladys, Fondatrice
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}