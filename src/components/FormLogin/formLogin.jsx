import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Alert,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const [formData, setFormData] = useState({
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
      email: formData.email,
      mdp: formData.mdp,
    };

    try {
      const response = await fetch(
        "https://api-dev.akov-developpement.fr/api/users/login",
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
        localStorage.setItem("DataLogin", JSON.stringify(data));
        console.log("Connexion réussie :", data);

        if (data.role === "ADMIN") {
          navigate("/admin");
          toast.success("Vous êtes connecté avec succès.");
        } else if (data.role === "USER") {
          navigate("/produits");
          toast.success("Vous êtes connecté avec succès.");
        } else {
          setError(
            "Erreur lors de l'identification. Veuillez contacter l'administrateur.",
          );
        }
        setError(null);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message ||
            "Erreur lors de la connexion. Veuillez vérifier vos identifiants.",
        );
      }
    } catch (error) {
      toast.error("Error:", error);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <Container className="form-login-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Connexion</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputGroup>
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
              Se connecter
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLogin;
