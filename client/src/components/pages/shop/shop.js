import React from 'react';

import Filter from './filter'
import FilterRow from './filterRow'
import Header from './header'

import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Sticky from 'react-stickynode';

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.props.setPage('shop')
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
            <div>
                <Header />
                <Sticky enabled={this.state.width > 900 ? true : false} top={0} innerZ={2001}>
                    <FilterRow />
                </Sticky>
                <Container fluid={true} className="shop_container">
                    <Row className="main_shop_row">
                        <Col md={3}>
                            <Sticky enabled={this.state.width > 900 ? true : false} top={20} innerZ={2000}>
                                <Filter />
                            </Sticky>
                        </Col>
                        <Col md={9} className="p-50" style={{ height: '1200px', marginTop: '100px' }}>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default
    connect(
        state => ({}),
        dispatch => ({
            setPage: (page) => { dispatch({ type: 'SET_PAGE', payload: page }) }
        })
    )(Shop)
