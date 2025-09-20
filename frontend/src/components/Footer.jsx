import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="text-center">
          <Link to="/">
            <img 
              src="/logo.png" 
              alt="Loire & Nature Conciergerie" 
              className="footer-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </Link>

          <div className="footer-contact justify-content-center">
            <a href="tel:0743535331">
              <i className="bi bi-telephone-fill"></i>
              07 43 53 53 31
            </a>
            <a href="mailto:loire.et.nature.conciergerie@gmail.com">
              <i className="bi bi-envelope-fill"></i>
              loire.et.nature.conciergerie@gmail.com
            </a>
          </div>

          <div className="footer-links">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/cgv">CGV</Link>
            <Link to="/cgu">CGU</Link>
            <Link to="/login">Administration</Link>
          </div>

          <div className="footer-social">
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
    </footer>
  );
}
