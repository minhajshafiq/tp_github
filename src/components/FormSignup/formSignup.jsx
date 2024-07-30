import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const FormSignup = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      mdp: formData.mdp,
    };

    try {
      const response = await fetch(
        "https://api-dev.akov-developpement.fr/api/users/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Compte créé :", data);
        // Enregistrer la réponse complète de l'API dans le localStorage
        localStorage.setItem("userDataSignup", JSON.stringify(data));
        toast.success("Vous êtes inscrit avec succès.");
        navigate("/produits");
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erreur lors de la création du compte.");
      }
    } catch (error) {
      toast.error("Error:", error);
      setError("Une erreur est survenue.");
    }
  };

  return (
    <Container className="form-signup-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Inscription</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom"
                value={formData.nom}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="prenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre prénom"
                value={formData.prenom}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                id="mdp"
                value={formData.mdp}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              S'inscrire
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormSignup;
