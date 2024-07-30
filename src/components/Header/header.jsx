import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import NavbarLinks from "../Navbar/navbar";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <>
      <Navbar expand="lg" className="mx-auto custom-navbar">
        <Navbar.Brand as={Link} to="/" className="mx-auto">
          ParfurMe{" "}
          <Image
            src="https://cdn-icons-png.flaticon.com/512/4331/4331207.png"
            alt="logo"
            width="30"
            height="30"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-auto" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <NavbarLinks />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
