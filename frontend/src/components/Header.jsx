import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const defaultNavigationLinks = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Nos Services" },
  { to: "/reservations", label: "Réservations" },
  { to: "/about", label: "À Propos" },
  { to: "/contact", label: "Contact" },
];

export function Header({ navigationLinks = defaultNavigationLinks }) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const handleNavClick = () => setExpanded(false);

  const isActiveLink = (linkPath) => {
    if (linkPath === "/") return location.pathname === "/";
    return location.pathname.startsWith(linkPath);
  };

  return (
    <Navbar
      expand="lg"
      className="navbar-custom"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
          Loire & Nature Conciergerie
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navigationLinks.map((link, index) =>
              link.external ? (
                <Nav.Link
                  key={index}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                >
                  {link.label}
                </Nav.Link>
              ) : (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={link.to}
                  onClick={handleNavClick}
                  className={isActiveLink(link.to) ? "active" : ""}
                >
                  {link.label}
                </Nav.Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}