import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

const Contact = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://api-dev.akov-developpement.fr/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname, email, message }),
        },
      );

      if (response.ok) {
        setSuccess("Votre message a été envoyé avec succès.");
        setFirstname("");
        setLastname("");
        setEmail("");
        setTel("");
        setSujet("");
        setMessage("");
      } else {
        const errorData = await response.json();
        setError(
          `Erreur ${response.status}: ${errorData.message || "Erreur lors de l'envoi du message."}`,
        );
      }
    } catch (error) {
      console.error("Error sending contact message:", error);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h1>Contactez-nous</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fname" className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="lname" className="mb-3">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="tel" className="mb-3">
          <Form.Label>Tel</Form.Label>
          <Form.Control
            type="number"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="sujet" className="mb-3">
          <Form.Label>Sujet</Form.Label>
          <Form.Control
            type="text"
            value={sujet}
            onChange={(e) => setSujet(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="message" className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Envoyer"}
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mt-3">
          {success}
        </Alert>
      )}
    </Container>
  );
};

export default Contact;
