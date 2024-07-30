import React from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";

const UserData = () => {
  const formData = localStorage.getItem("DataLogin");
  const user = formData ? JSON.parse(formData) : null;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Données Utilisateur</Card.Header>
            <Card.Body>
              {user ? (
                <>
                  <Card.Text>
                    <strong>Email:</strong> {user.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Nom:</strong> {user.nom}
                  </Card.Text>
                  <Card.Text>
                    <strong>Prénom:</strong> {user.prenom}
                  </Card.Text>
                </>
              ) : (
                <Alert variant="info">
                  Aucune donnée utilisateur trouvée dans le stockage local.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserData;
