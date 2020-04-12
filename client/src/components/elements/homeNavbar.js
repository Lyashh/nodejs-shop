import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'

class NavbarComponent extends React.Component {

  render() {
    return (
      <Container>
        <Navbar collapseOnSelect expand="lg" className="navbar_container">
          <Navbar.Brand href="#home">
            <div class="logo">
              <div class="site-logo">
                <div class="js-logo-clone">bonsai shop</div>
                <img className="logoIcon" />
              </div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
            <Nav className="justify-content-center">
              <Nav.Link >Shop</Nav.Link>
              <Nav.Link >Contacts</Nav.Link>
              <Nav.Link >About</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="justify-content-end">
              <Nav.Link className="inherit-nav-link">
                <img className="cartIcon" />
                <div class="circle">
                  1
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default NavbarComponent
