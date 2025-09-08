import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useScrollAnimation } from "../components/useScrollAnimation";

function PageMeta({ title, description, keywords }) {
  useEffect(() => {
    if (title) document.title = title;

    const ensureMeta = (name, content) => {
      if (!content) return;
      let el = document.head.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    ensureMeta(
      "description",
      description ||
        "Loire & Nature Conciergerie propose des services de conciergerie haut de gamme."
    );
    ensureMeta("keywords", keywords || "conciergerie, Loire-Atlantique");
  }, [title, description, keywords]);

  return null;
}

const services = [
  {
    icon: "🏠",
    title: "Gestion Locative",
    description:
      "Gestion complète de vos locations saisonnières avec un service personnalisé et professionnel.",
  },
  {
    icon: "🌱",
    title: "Entretien & Jardinage",
    description:
      "Maintenance de vos espaces verts et entretien régulier de vos propriétés pour un cadre toujours parfait.",
  },
  {
    icon: "🔧",
    title: "Maintenance Technique",
    description:
      "Interventions techniques rapides et efficaces pour maintenir vos biens en parfait état.",
  },
  {
    icon: "⭐",
    title: "Services Premium",
    description:
      "Services sur-mesure adaptés à vos besoins spécifiques pour une expérience client exceptionnelle.",
  },
];

const qualityItems = [
  {
    title: "Excellence du Service",
    description:
      "Nous nous engageons à fournir un service irréprochable à chaque intervention, avec une attention particulière aux détails et aux attentes de nos clients.",
  },
  {
    title: "Respect de l'Environnement",
    description:
      "Notre approche privilégie l'utilisation de produits écologiques et de méthodes respectueuses de la nature Loire-Atlantique que nous chérissons.",
  },
  {
    title: "Proximité et Réactivité",
    description:
      "Implantés localement, nous garantissons une réactivité optimale et une connaissance approfondie du territoire pour mieux vous servir.",
  },
  {
    title: "Transparence et Confiance",
    description:
      "Nos tarifs sont transparents, nos méthodes claires, et notre relation client basée sur la confiance mutuelle et la communication régulière.",
  },
  {
    title: "Personnalisation des Services",
    description:
      "Chaque propriété est unique, c'est pourquoi nous adaptons nos services à vos besoins spécifiques et aux caractéristiques de votre bien.",
  },
];

function QualityItem({ item, index }) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <div
      ref={ref}
      className={`quality-item ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <PageMeta
        title="Loire & Nature Conciergerie - Services de conciergerie premium en Loire-Atlantique"
        description="Loire & Nature Conciergerie propose des services de conciergerie haut de gamme pour vos propriétés de vacances en Loire-Atlantique. Gestion locative, entretien, jardinage et bien plus."
        keywords="conciergerie, Loire-Atlantique, Nantes, gestion locative, location saisonnière, entretien propriété, jardinage"
      />

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={10} xl={8}>
              <div className="hero-content">
                <h1 className="fade-in-up">Loire & Nature Conciergerie</h1>
                <p className="fade-in-up" style={{ animationDelay: "0.3s" }}>
                  Votre partenaire de confiance pour la gestion et l'entretien
                  de vos propriétés en Loire-Atlantique. Des services premium
                  dans le respect de la nature.
                </p>
                <div className="fade-in-up" style={{ animationDelay: "0.6s" }}>
                  <Button size="lg" className="btn-primary me-3 mb-2" href="#services">
                    Découvrir nos services
                  </Button>
                  <Button
                    size="lg"
                    variant="outline-light"
                    className="mb-2"
                    href="#contact"
                  >
                    Nous contacter
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="text-primary-custom mb-3">Nos Services de Conciergerie</h2>
              <p className="lead text-muted">
                Des solutions complètes pour valoriser et préserver vos biens immobiliers
              </p>
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="service-card">
                  <div className="card-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Quality Charter Section */}
      <section className="quality-section">
        <Container>
          <Row>
            <Col lg={12}>
              <h2>Notre Charte Qualité</h2>
            </Col>
            <Col lg={8} className="mx-auto">
              {qualityItems.map((item, index) => (
                <QualityItem key={index} item={item} index={index} />
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h3 className="text-primary-custom mb-3">
                Prêt à confier vos biens à des experts ?
              </h3>
              <p className="lead mb-4">
                Contactez-nous dès aujourd'hui pour un devis personnalisé et découvrez
                comment nous pouvons valoriser vos propriétés.
              </p>
              <Button size="lg" className="btn-primary">
                Demander un devis gratuit
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
