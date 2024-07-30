import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Spinner, Alert, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Acceuil.css";

const Acceuil = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://api-dev.akov-developpement.fr/api/produit/all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(
          `Erreur ${response.status}: ${
            errorData.message || "Erreur lors de la récupération des produits."
          }`
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrer les produits pour le Carousel par ID 6, 11, 13 et 15
  const carouselProducts = products.filter(product => [6, 11, 13, 15].includes(product.id));

  // Filtrer les produits en vedette par ID 6, 13 et 15
  const featuredProducts = products.filter(product => [6, 13, 15].includes(product.id));

  return (
    <div className="acceuil">
      <Container fluid className="hero-banner">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Chargement du produit...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row>
            <Col md={12} className="hero-image">
              <Carousel activeIndex={index} onSelect={handleSelect}>
                {carouselProducts.map((product, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100 carousel-image"
                      src={product.image}
                      alt={`Slide ${idx}`}
                    />
                    <Carousel.Caption>
                      <h3>{product.nom}</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        )}
      </Container>

      <Container className="about-us mt-5">
        <h2>À propos de nous</h2>
        <p>
          Bienvenue dans notre boutique de parfums en ligne! Nous sommes dédiés
          à vous offrir les meilleurs parfums du monde entier. Nos produits sont
          soigneusement sélectionnés pour leur qualité et leur originalité.
        </p>
      </Container>

      <Container className="featured-products mt-5">
        <h2>Produits en vedette</h2>
        <Row>
          {featuredProducts.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.nom} />
                <Card.Body>
                  <Card.Title>{product.nom}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>{product.prix} €</Card.Text>
                  <Link
                    to={`/produits/${product.id}`}
                    className="btn btn-primary"
                  >
                    Voir le produit
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Acceuil;