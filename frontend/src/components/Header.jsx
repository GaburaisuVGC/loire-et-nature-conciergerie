import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

export function Header() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const isReservationActive = () => {
    return ['/reservations', '/voyageurs', '/proprietaires', '/partenaires'].includes(location.pathname);
  };

  return (
    <div className="header-wrapper">
      <div className="top-header d-none d-md-block">
        <Container>
          <div className="row align-items-center">
            <div className="col-md-4">
              <a href="tel:0743535331" className="phone-number">
                <i className="bi bi-telephone-fill"></i>
                <span>07 43 53 53 31</span>
              </a>
            </div>
            <div className="col-md-4 text-center">
              <Link to="/" className="logo-container">
                <img 
                  src="/logo.png" 
                  alt="Loire & Nature Conciergerie" 
                  className="logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="font-garamond text-vert">Loire & Nature</span>';
                  }}
                />
              </Link>
            </div>
            <div className="col-md-4 d-flex social-icons justify-content-end">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" aria-label="Google">
                <i className="bi bi-google"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Navbar expand="lg" className="main-nav sticky-desktop-only">
        <Container>
          <Link to="/" className="navbar-brand mx-auto d-md-none">
            <img 
              src="/logo.png" 
              alt="Loire & Nature Conciergerie" 
              onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
          </Link>

          <Navbar.Toggle aria-controls="main-navbar" className="ms-auto" />
          <Navbar.Collapse id="main-navbar">
            <div className="d-md-none">
              <div className="nav-extra">
                <a href="tel:0743535331" className="phone-number">
                  <i className="bi bi-telephone-fill"></i>
                  <span>07 43 53 53 31</span>
                </a>
              </div>
              <div className="nav-social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" aria-label="Google">
                  <i className="bi bi-google"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>

            <Nav className="mx-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={location.pathname === "/" ? "active" : ""}
              >
                Accueil
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/notre-demarche" 
                className={location.pathname === "/notre-demarche" ? "active" : ""}
              >
                Notre démarche
              </Nav.Link>
              
              {/* Dropdown Réservations */}
              <Dropdown
                show={showDropdown}
                onToggle={(nextShow) => setShowDropdown(nextShow)}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                className="nav-dropdown"
              >
                <div className={`nav-link-dropdown ${isReservationActive() ? "active" : ""}`}>
                  <Link 
                    to="/reservations" 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    className="me-1"
                  >
                    Réservations
                  </Link>
                  <i 
                    className="bi bi-chevron-down dropdown-arrow"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setShowDropdown(!showDropdown);
                    }}
                    style={{ 
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      transition: 'transform 0.2s ease',
                      transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  ></i>
                </div>

                <Dropdown.Menu
                  className="dropdown-menu-custom"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Dropdown.Item 
                    as={Link} 
                    to="/reservations"
                    className={location.pathname === "/reservations" ? "active" : ""}
                  >
                    Réservations
                  </Dropdown.Item>
                  <Dropdown.Item 
                    as={Link} 
                    to="/voyageurs"
                    className={location.pathname === "/voyageurs" ? "active" : ""}
                  >
                    Voyageurs
                  </Dropdown.Item>
                  <Dropdown.Item 
                    as={Link} 
                    to="/proprietaires"
                    className={location.pathname === "/proprietaires" ? "active" : ""}
                  >
                    Propriétaires
                  </Dropdown.Item>
                  <Dropdown.Item 
                    as={Link} 
                    to="/partenaires"
                    className={location.pathname === "/partenaires" ? "active" : ""}
                  >
                    Partenaires
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Nav.Link 
              as={Link} 
              to="/temoignages" 
              className={location.pathname === "/temoignages" ? "active" : ""}
            >
              Témoignages
            </Nav.Link>

              <Nav.Link 
                as={Link} 
                to="/contact" 
                className={location.pathname === "/contact" ? "active" : ""}
              >
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}