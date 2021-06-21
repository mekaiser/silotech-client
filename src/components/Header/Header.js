import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const newUserInfo = { ...loggedInUser };
        newUserInfo.isSignedIn = false;
        setLoggedInUser(newUserInfo);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand-custom" to="/home">SILOTECH</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav className="nav-link ml-3 mr-3">
              <Link className="nav-link-custom" to="/home">
                Home
              </Link>
            </Nav>
            <Nav className="nav-link ml-3 mr-3">
              <Link className="nav-link-custom" to="/orders">
                Orders
              </Link>
            </Nav>
            <Nav className="nav-link ml-3 mr-3">
              <Link className="nav-link-custom" to="/admin">
                Admin
              </Link>
            </Nav>
            <Nav className="nav-link ml-3 mr-3">
              <Link className="nav-link-custom" to="/deals">
                Deals
              </Link>
            </Nav>
            <Button
              onClick={loggedInUser.isSignedIn? handleGoogleSignOut : undefined}
              className="login-btn ml-3 mr-3"
            >
              <Link className="login-btn-text" to="/login">
                {loggedInUser.isSignedIn ? "Logout" : "Login"}
              </Link>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
