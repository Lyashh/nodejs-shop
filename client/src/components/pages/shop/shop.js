import React from 'react';

import Filter from './filter'
import FilterRow from './filterRow'
import Header from './header'
import Items from './items'

import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Sticky from 'react-stickynode';
import { withRouter } from "react-router-dom"


class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            page: 1
        };


        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.page) {
            this.setState({ page: this.props.match.params.page })
        } else {
            this.setState({ page: 1 })
        }
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

    setPosition(position) {
        this.setState({ position })
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
                        <Col md={9} className="p-70">
                            <Items position={this.props.position} />
                            {this.state.page}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default
    withRouter(connect(
        state => ({
            position: state.itemsFilter.position
        }),
        dispatch => ({
            setPage: (page) => { dispatch({ type: 'SET_PAGE', payload: page }) },
        })
    )(Shop))
