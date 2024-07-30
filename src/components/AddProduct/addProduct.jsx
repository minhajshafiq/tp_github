import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    nom: "",
    description: "",
    prix: "",
    image: "",
    tail: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "description" && value.length > 255) {
      setError("La description ne peut pas dépasser 255 caractères.");
      return;
    } else {
      setError(null);
    }

    setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nom, description, prix, image, tail } = productData;

    if (!nom || !description || !prix || !image || !tail) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (
      isNaN(prix) ||
      isNaN(tail) ||
      parseFloat(prix) <= 0 ||
      parseFloat(tail) <= 0
    ) {
      setError(
        "Veuillez entrer des valeurs numériques valides pour le prix et la taille.",
      );
      return;
    }

    const payload = {
      nom,
      description,
      prix: parseFloat(prix),
      image,
      tail: parseFloat(tail),
    };

    try {
      const response = await fetch(
        "https://api-dev.akov-developpement.fr/api/produit/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      toast.success("Produit ajouté avec succès !");
      setError(null);
      setProductData({
        nom: "",
        description: "",
        prix: "",
        image: "",
        tail: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <Container className="form-add-product-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Ajout d'un produit</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nom">
              <Form.Label>Nom du produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom du produit"
                value={productData.nom}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrez la description"
                value={productData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="prix">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez le prix"
                value={productData.prix}
                onChange={handleChange}
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image (URL)</Form.Label>
              <Form.Control
                type="url"
                placeholder="Entrez l'URL de l'image"
                value={productData.image}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="tail">
              <Form.Label>Taille</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez la taille"
                value={productData.tail}
                onChange={handleChange}
                step="0.01"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Ajouter le produit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
