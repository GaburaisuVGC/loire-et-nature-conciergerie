import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const defaultSections = [
  {
    title: "Services",
    links: [
      { to: "/services/conciergerie", label: "Conciergerie" },
      { to: "/services/gestion-locative", label: "Gestion Locative" },
      { to: "/services/entretien", label: "Entretien & Maintenance" },
      { to: "/services/jardinage", label: "Services de Jardinage" },
    ],
  },
  {
    title: "Propriétés",
    links: [
      { to: "/reservations", label: "Nos Logements" },
      { to: "/proprietes/gites", label: "Gîtes & Chambres d'hôtes" },
      { to: "/proprietes/maisons", label: "Maisons de Vacances" },
      { to: "/proprietes/appartements", label: "Appartements" },
    ],
  },
  {
    title: "Informations",
    links: [
      { to: "/about", label: "À Propos" },
      { to: "/blog", label: "Blog" },
      { to: "/faq", label: "FAQ" },
      { to: "/conditions", label: "Conditions Générales" },
    ],
  },
];

const defaultCompanyInfo = {
  name: "Loire & Nature Conciergerie",
  address: "44000 Nantes, Pays de la Loire",
  phone: "+33 (0)2 XX XX XX XX",
  email: "contact@loire-nature-conciergerie.fr",
};

const defaultSocialLinks = [
  { to: "https://facebook.com", label: "Facebook", external: true },
  { to: "https://instagram.com", label: "Instagram", external: true },
  { to: "https://linkedin.com", label: "LinkedIn", external: true },
];

export function Footer({
  sections = defaultSections,
  companyInfo = defaultCompanyInfo,
  socialLinks = defaultSocialLinks,
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <Container>
        <Row>
          {/* Company Information */}
          <Col lg={4} md={6} className="mb-4">
            <h5>{companyInfo.name}</h5>
            <div className="mb-3">
              <p className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                {companyInfo.address}
              </p>
              <p className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}>
                  {companyInfo.phone}
                </a>
              </p>
              <p className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </p>
            </div>

            {/* Social Links */}
            <div className="d-flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                  aria-label={social.label}
                >
                  <i
                    className={`bi bi-${social.label.toLowerCase()} fs-5`}
                  ></i>
                </a>
              ))}
            </div>
          </Col>

          {/* Footer Sections */}
          {sections.map((section, sectionIndex) => (
            <Col lg={2} md={6} sm={6} key={sectionIndex} className="mb-4">
              <h5>{section.title}</h5>
              <ul className="list-unstyled">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    {link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </Col>
          ))}

          {/* Newsletter Subscription */}
          <Col lg={2} md={12} className="mb-4">
            <h5>Newsletter</h5>
            <p className="mb-3">
              Restez informé de nos dernières actualités et offres spéciales.
            </p>
            <div className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Votre email"
                aria-label="Email pour newsletter"
              />
              <button
                className="btn btn-primary"
                type="button"
                aria-label="S'abonner à la newsletter"
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </Col>
        </Row>

        <hr className="my-4" style={{ borderColor: "#5D90B3" }} />

        {/* Copyright and Admin Link */}
        <Row>
          <Col md={6}>
            <p className="mb-0">
              © {currentYear} {companyInfo.name}. Tous droits réservés.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <Link to="/login" className="text-muted small">
              <i className="bi bi-shield-lock me-1"></i>
              Administration
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}