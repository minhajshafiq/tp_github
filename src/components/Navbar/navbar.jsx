import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function NavbarLinks() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dataLogin = localStorage.getItem("DataLogin");
    if (dataLogin) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("DataLogin");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar expand="lg">
      <Nav variant="pills" defaultActiveKey="/" className="mr-auto">
        <Nav.Link as={Link} to="/" eventKey="link-0">
          Accueil
        </Nav.Link>
        <Nav.Link as={Link} to="/produits" eventKey="link-1">
          Produits
        </Nav.Link>
        <Nav.Link as={Link} to="/contact" eventKey="link-2">
          Contact
        </Nav.Link>
        {isLoggedIn ? (
          <>
            <Nav.Link as={Link} to="/espaceclient" eventKey="link-3">
              Espace Client
            </Nav.Link>
            <Button variant="outline-danger" onClick={handleLogout}>
              Déconnexion
            </Button>
          </>
        ) : (
          <Nav.Link as={Link} to="/espaceclient" eventKey="link-3">
            Espace Client
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
}
