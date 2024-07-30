import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <Container>
        <Row>
          <Col md={4} className="footer-section">
            <h5>À propos de ParfurMe</h5>
            <p>
              ParfurMe est votre destination en ligne pour découvrir les
              meilleurs parfums du monde entier. Nous nous engageons à offrir
              une sélection de parfums raffinés et originaux.
            </p>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Nos Produits</h5>
            <ul>
              <li>
                <Link to="/produits">Parfums</Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Contactez-nous</h5>
            <p>
              Pour toute question ou demande d'assistance, n'hésitez pas à nous
              contacter :
            </p>
            <p>Email: contact@parfurme.com</p>
            <p>Téléphone: +1234567890</p>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col md={6}>
              <p>&copy; 2024 ParfurMe. Tous droits réservés.</p>
            </Col>
            <Col md={6} className="text-right">
              <ul className="social-links">
                <li>
                  <a
                    href="https://www.facebook.com/ParfurMe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/ParfurMe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ParfurMe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
