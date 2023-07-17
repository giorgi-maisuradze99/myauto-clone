import React from "react";
import logo from "../../Images/logo.png";
import { Container } from "react-bootstrap";

const Navbar = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="nav">
      <Container>
        <img className="logo" src={logo} onClick={refreshPage} />
      </Container>
    </div>
  );
};

export default Navbar;
