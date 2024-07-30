import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./listProduct.css";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://api-dev.akov-developpement.fr/api/produit/all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(
          `Erreur ${response.status}: ${errorData.message || "Erreur lors de la récupération des produits."}`,
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

  const sortedProducts = products.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.prix - b.prix;
    } else {
      return b.prix - a.prix;
    }
  });

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Chargement des produits...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Form.Group controlId="sortOrder" className="mb-3">
            <Form.Label>Trier par prix</Form.Label>
            <Form.Control
              as="select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Croissant</option>
              <option value="desc">Décroissant</option>
            </Form.Control>
          </Form.Group>
          <Row>
            {sortedProducts.map((product, index) => (
              <Col key={index} md={4} className="mb-4">
                <Card className="product-card">
                  <Link to={`/produits/${product.id}`}>
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.nom}
                      className="product-image"
                    />
                    <Card.Body className="product-body">
                      <Card.Title>{product.nom}</Card.Title>
                      <Card.Text>Prix: {product.prix}</Card.Text>
                      <Card.Text>Description: {product.description}</Card.Text>
                      <Card.Text>Taille: {product.tail}</Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default ListProduct;
