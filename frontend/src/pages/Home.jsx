import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import testimonialService from "../services/testimonialService";

export default function Home() {
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadTopTestimonials();
  }, []);

  const loadTopTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialService.getTopTestimonials(3);
      setDisplayedTestimonials(data);
    } catch (error) {
      console.error("Error loading top testimonials:", error);
      setDisplayedTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, interactive = false, size = "1.5rem") => {
    return (
      <div className="d-flex" style={{ gap: "5px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`bi ${star <= rating ? "bi-star-fill" : "bi-star"}`}
            style={{
              fontSize: size,
              color: "var(--beige-terre)",
              cursor: interactive ? "pointer" : "default",
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>
    );
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return { text, isTruncated: false };
    return {
      text: text.substring(0, maxLength) + "...",
      isTruncated: true,
    };
  };

  const handleReadMore = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTestimonial(null);
  };

  return (
    <>
      <section
        className="hero-section"
        style={{
          backgroundImage: `url('/hero-image-home.jpg')`,
          backgroundColor: "#D8CBB5",
        }}
      >
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content">
            <p className="subtitle-italic">
              Conciergerie locale & engagée au cœur du Val de Loire,
            </p>
            <p className="subtitle-main">pour des séjours immersifs</p>
            <p>
              Experts de la gestion de location courte durée pour les séjours
              d'affaires et de tourisme.
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
              Bienvenue chez <strong>Loire & Nature</strong>, une conciergerie
              indépendante, chaleureuse et responsable.
            </p>
            <p>
              "Nous accompagnons les propriétaires dans la gestion complète de
              leur location de courte durée,
              <br />
              tout en offrant aux voyageurs une expérience immersive,
              <br />
              ancrée dans le patrimoine régional et les savoir-faire locaux."
            </p>
            <p className="quote-text">
              "L'idée est née de l'envie de partager et faire découvrir aux
              voyageurs
              <br />
              le charme et l'accueil de la région, tout en valorisant
              l'artisanat local"
            </p>
            <p className="fs-5 mt-4">
              <strong>
                Soyez serein ! Nous prenons soin de votre logement et de vos
                hôtes.
              </strong>
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
                  <i
                    className="bi bi-geo-alt-fill text-vert"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
                <h3>Ancrage local et authenticité</h3>
                <p className="subtitle">
                  Une conciergerie enracinée dans son territoire
                </p>
                <ul>
                  <li>
                    Service de proximité, implanté dans la région Orléanaise
                  </li>
                  <li>
                    Valorisation des hébergements de caractère, des artisans
                    locaux, des activités de nature et des producteurs du coin.
                  </li>
                  <li>Accueil personnalisé</li>
                </ul>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="icon-container">
                  <i
                    className="bi bi-people-fill text-vert"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
                <h3>Engagement humain et relationnel</h3>
                <p className="subtitle">
                  Le lien humain au cœur de l'expérience
                </p>
                <ul>
                  <li>
                    Une attention portée au bien-être des voyageurs et des
                    propriétaires
                  </li>
                  <li>
                    Des services à l'écoute, souples, disponibles et
                    bienveillants
                  </li>
                  <li>Réactivité et autonomie</li>
                </ul>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="icon-container">
                  <i
                    className="bi bi-heart-fill text-vert"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
                <h3>Simplicité & sérénité</h3>
                <p className="subtitle">
                  Un service pensé pour libérer l'esprit
                </p>
                <ul>
                  <li>
                    Simplification de la logistique pour les voyageurs et les
                    propriétaires
                  </li>
                  <li>Accompagnement fluide pour des séjours sans stress</li>
                </ul>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="icon-container">
                  <i
                    className="bi bi-leaf-fill text-vert"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
                <h3>Respect de la nature & éthique</h3>
                <p className="subtitle">
                  Une conciergerie engagée pour un tourisme durable
                </p>
                <ul>
                  <li>Choix de produits d'entretien respectueux</li>
                  <li>Choix de partenariats locaux</li>
                </ul>
              </div>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <p className="fs-5" style={{ maxWidth: "900px", margin: "0 auto" }}>
              Chez Loire & Nature, nous croyons en une conciergerie locale,
              humaine et responsable,
              <br />
              qui allie sérénité, exigence et authenticité.
              <br />
              Nous vous accompagnons avec cœur, rigueur et simplicité, pour
              valoriser votre
              <br />
              logement et offrir aux voyageurs un séjour inoubliable, dans le
              respect du territoire.
            </p>
          </div>
        </Container>
      </section>

      {!loading && displayedTestimonials.length > 0 && (
        <section className="testimonials-section">
          <Container>
            <div className="section-title">
              <h2>Témoignages</h2>
            </div>

            <p className="text-center fs-5 mb-5">Ils nous ont fait confiance</p>

            <Row className="justify-content-center">
              {displayedTestimonials.map((testimonial) => {
                const { text, isTruncated } = truncateText(testimonial.comment);
                return (
                  <Col key={testimonial.id} xs={12} sm={6} lg={3}>
                    <div className="testimonial-card h-100 d-flex flex-column">
                      <div className="mb-2">
                        {renderStars(testimonial.rating, false, "1.2rem")}
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.9rem" }}
                        >
                          Par {testimonial.name}
                        </span>
                      </div>
                      <p
                        className="testimonial-text flex-grow-1"
                        style={{ fontSize: "0.95rem" }}
                      >
                        {text}
                      </p>
                      {isTruncated && (
                        <button
                          className="btn btn-link p-0 text-vert"
                          style={{
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            alignSelf: "flex-start",
                          }}
                          onClick={() => handleReadMore(testimonial)}
                        >
                          Lire la suite
                        </button>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>

            <div className="text-center mt-4">
              <Link to="/temoignages" className="btn-custom-vert">
                Voir tous les témoignages
              </Link>
            </div>
          </Container>
        </section>
      )}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title
            className="text-vert font-garamond"
            style={{ fontWeight: "bold" }}
          >
            Témoignage complet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTestimonial && (
            <>
              <div className="mb-3">
                {renderStars(selectedTestimonial.rating, false, "1.5rem")}
                <div className="text-muted mt-2">
                  Par <strong>{selectedTestimonial.name}</strong>
                </div>
              </div>
              <p style={{ lineHeight: "1.8", color: "var(--gris-fonce)" }}>
                {selectedTestimonial.comment}
              </p>
            </>
          )}
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .modal-backdrop {
          backdrop-filter: blur(5px);
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
}
