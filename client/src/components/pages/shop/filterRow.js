import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import SwitchFilter from './switchFilter'

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }

    render() {

        return (
            <Navbar expand="lg" className="filter_navbar">
            <Navbar.Brand ></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="filter-toggle" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto nav-filter_row">
                    {this.state.width > 991 ? <p className="filter_title">Sort By</p> : null}
                    <Nav.Link className="filter_link">
                        <NavDropdown title="Default" id="basic-nav-dropdown" className="filter_dropdown order_filter">
                        <NavDropdown.Item >
                            <img className="small_icon sort_arrow_icon"/>
                            Default
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <img className="up_arrow_icon small_icon" />
                            Low to High
                        </NavDropdown.Item>
                        <NavDropdown.Item >
                            <img className="down_arrow_icon small_icon" />
                            High to Low
                        </NavDropdown.Item>
                        </NavDropdown>
                </Nav.Link>

                {this.state.width > 991 ?  <p className="filter_title">Items Per Page</p> : null}
               
                  <Nav.Link className="filter_link">
                    <NavDropdown title="20" id="basic-nav-dropdown" className="filter_dropdown items_quan_filter">
                    <NavDropdown.Item >
                        20
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                        40
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                        60
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav.Link>
              </Nav>

            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end">
                <Nav className="justify-content-end nav-filter_row">
                    <Nav.Link >
                        <SwitchFilter />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

export default Filter

