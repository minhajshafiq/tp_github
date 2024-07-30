import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>404 / Page Not Found</h1>
          <p>Oops ! il y a eu une erreur.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
