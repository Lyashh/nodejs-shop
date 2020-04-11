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
                <div href="#" class="js-logo-clone">bonsai shop</div>
              </div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end"> 
            <Nav className="justify-content-end">
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
      </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default NavbarComponent
