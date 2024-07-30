import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import toast from "react-hot-toast";
import "./productDetails.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderError, setOrderError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api-dev.akov-developpement.fr/api/produit/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setError(null);
        } else {
          const errorData = await response.json();
          setError(
            `Erreur ${response.status}: ${errorData.message || "Erreur lors de la récupération du produit."}`,
          );
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Une erreur est survenue. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrder = async () => {
    const dataLogin = JSON.parse(localStorage.getItem("DataLogin"));
    if (!dataLogin) {
      setOrderError("Veuillez vous connecter pour passer une commande.");
      return;
    }

    const payload = {
      idUser: dataLogin.id,
      idProduit: id,
      qte: quantity,
    };

    try {
      const response = await fetch(
        "https://api-dev.akov-developpement.fr/api/commande/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        toast.success("Commande passée avec succès!");
        setOrderError(null);
        navigate("/produits");
      } else {
        const errorData = await response.json();
        setOrderError(
          `Erreur ${response.status}: ${errorData.message || "Erreur lors de la passation de la commande."}`,
        );
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderError(
        "Une erreur est survenue lors de la passation de la commande. Veuillez réessayer plus tard.",
      );
    }
  };

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Chargement du produit...</span>
          </Spinner>
          <p>Chargement du produit...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        product && (
          <Row className="product-detail">
            <Col md={6} className="text-center">
              <Image
                src={product.image}
                alt={product.nom}
                className="product-image2"
                fluid
              />
            </Col>
            <Col md={6}>
              <div className="product-info">
                <h1>{product.nom}</h1>
                <p>
                  <strong>Prix:</strong> {product.prix}
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
                <p>
                  <strong>Taille:</strong> {product.tail}
                </p>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantité:</Form.Label>
                  <Form.Control
                    as="select"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleOrder}
                  className="mt-3"
                >
                  Commander
                </Button>
                {orderError && (
                  <Alert variant="danger" className="mt-3">
                    {orderError}
                  </Alert>
                )}
              </div>
            </Col>
          </Row>
        )
      )}
    </Container>
  );
};

export default ProductDetail;
