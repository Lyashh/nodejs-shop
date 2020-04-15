import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from "react-router-dom"

class NavbarComponent extends React.Component {

  render() {
    return (
      <Container className="navbar_wrapper" fluid={true}>
        <Container className="navbar_wrapper">
          <Navbar collapseOnSelect expand="lg" className="navbar_container">
            <Link className="navbar-brand" to="/">
              <div className="logo">
                <div className="site-logo">
                  <div className="js-logo-clone">bonsai shop</div>
                  <img className="logoIcon" />
                </div>
              </div>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="main_nav_togler" />

            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center main_nav_collapse" >
              <Nav className="justify-content-center">
                <Link to="/shop" className="nav-link">Shop</Link>
                <Nav.Link >Contacts</Nav.Link>
                <Nav.Link >About</Nav.Link>
              </Nav>
            </Navbar.Collapse>

            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end main_nav_collapse">
              <Nav className="justify-content-end">
                <Nav.Link className="inherit-nav-link">
                  <img className="cartIcon" />
                  <div className="circle">
                    1
                </div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </Container>
    );
  }
}

export default NavbarComponent
