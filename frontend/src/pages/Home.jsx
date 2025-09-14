import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    rating: 5,
    text: "Un service exceptionnel ! Loire & Nature a géré notre location avec professionnalisme et attention. Les voyageurs étaient ravis et notre maison était impeccable."
  },
  {
    id: 2,
    name: "Jean-Pierre Martin",
    rating: 5,
    text: "Grâce à Loire & Nature, je peux voyager l'esprit tranquille. Leur gestion est irréprochable et ils valorisent vraiment mon bien."
  },
  {
    id: 3,
    name: "Sophie Bernard",
    rating: 5,
    text: "Une équipe à l'écoute, réactive et bienveillante. Je recommande vivement leurs services de conciergerie."
  },
  {
    id: 4,
    name: "François Leblanc",
    rating: 5,
    text: "L'approche locale et authentique de Loire & Nature fait toute la différence. Nos hôtes apprécient particulièrement les recommandations personnalisées."
  }
];

export default function Home() {
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);

  useEffect(() => {
    const fiveStarTestimonials = testimonials.filter(t => t.rating === 5);
    setDisplayedTestimonials(fiveStarTestimonials);
  }, []);

  return (
    <>
      <section 
        className="hero-section"
        style={{
          backgroundImage: `url('/hero-image-home.jpg')`,
          backgroundColor: '#D8CBB5'
        }}
      >
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content">
            <p className="subtitle-italic">
              Conciergerie locale & engagée au cœur du Val de Loire,
            </p>
            <p className="subtitle-main">
              pour des séjours immersifs
            </p>
            <p>
              Experts de la gestion de location courte durée pour les séjours d'affaires et de tourisme.
            </p>
            <Link to="/contact" className="btn-custom-vert">
              Prendre rendez-vous
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="section-title">
            <h2>Notre engagement</h2>
          </div>

          <div className="text-center mb-4">
            <p className="fs-5">
              Bienvenue chez <strong>Loire & Nature</strong>, une conciergerie indépendante, chaleureuse et responsable.
            </p>
            <p>
              "Nous accompagnons les propriétaires dans la gestion complète de leur location de courte durée,<br />
              tout en offrant aux voyageurs une expérience immersive,<br />
              ancrée dans le patrimoine régional et les savoir-faire locaux."
            </p>
            <p className="quote-text">
              "L'idée est née de l'envie de partager et faire découvrir aux voyageurs<br />
              le charme et l'accueil de la région, tout en valorisant l'artisanat local"
            </p>
            <p className="fs-5 mt-4">
              <strong>Soyez serein ! nous prenons soin de votre logement et de vos hôtes.</strong>
            </p>
          </div>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <div className="section-title">
            <h2>Nos valeurs</h2>
          </div>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="icon-container">
                  <i className="bi bi-geo-alt-fill text-vert" style={{ fontSize: '2rem' }}></i>
                </div>
                <h3>Ancrage local et authenticité</h3>
                <p className="subtitle">Une conciergerie enracinée dans son territoire</p>
                <ul>
                  <li>Service de proximité, implanté dans la région Orléanaise</li>
                  <li>Valorisation des hébergements de caractère, des artisans locaux, des activités de nature et des producteurs du coin.</li>
                  <li>Accueil personnalisé</li>
                </ul>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="icon-container">
                  <i className="bi bi-people-fill text-vert" style={{ fontSize: '2rem' }}></i>
                </div>
                <h3>Engagement humain et relationnel</h3>
                <p className="subtitle">Le lien humain au cœur de l'expérience</p>
                <ul>
                  <li>Une attention portée au bien-être des voyageurs et des propriétaires</li>
                  <li>Des services à l'écoute, souples, disponibles et bienveillants</li>
                  <li>Réactivité et autonomie</li>
                </ul>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="icon-container">
                  <i className="bi bi-heart-fill text-vert" style={{ fontSize: '2rem' }}></i>
                </div>
                <h3>Simplicité & sérénité</h3>
                <p className="subtitle">Un service pensé pour libérer l'esprit</p>
                <ul>
                  <li>Simplification de la logistique pour les voyageurs et les propriétaires</li>
                  <li>Accompagnement fluide pour des séjours sans stress</li>
                </ul>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="icon-container">
                  <i className="bi bi-leaf-fill text-vert" style={{ fontSize: '2rem' }}></i>
                </div>
                <h3>Respect de la nature & éthique</h3>
                <p className="subtitle">Une conciergerie engagée pour un tourisme durable</p>
                <ul>
                  <li>Choix de produits d'entretien respectueux, partenariats locaux</li>
                </ul>
              </div>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <p className="fs-5" style={{ maxWidth: '900px', margin: '0 auto' }}>
              Chez Loire & Nature, nous croyons en une conciergerie locale, humaine et responsable,<br />
              qui allie sérénité, exigence et authenticité.<br />
              Nous vous accompagnons avec cœur, rigueur et simplicité, pour valoriser votre<br />
              logement et offrir aux voyageurs un séjour inoubliable, dans le respect du territoire.
            </p>
          </div>
        </Container>
      </section>

      <section className="testimonials-section">
        <Container>
          <div className="section-title">
            <h2>Témoignages</h2>
          </div>
          
          <p className="text-center fs-5 mb-5">Ils nous ont fait confiance</p>

          <Row>
            {displayedTestimonials.map((testimonial) => (
              <Col key={testimonial.id} lg={6} className="mb-4">
                <div className="testimonial-card">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <p className="testimonial-author">- {testimonial.name}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
