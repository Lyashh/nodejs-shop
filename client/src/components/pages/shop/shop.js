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
    }

    componentDidMount() {
        this.props.setPage('shop')
    }

    render() {
        return (
            <div>
                <Header />
                <Sticky enabled={true} top={0}>
                   <FilterRow />
                </Sticky>
                <Container fluid={true} className="shop_container">

                    <Row className="main_shop_row">

                        <Col md={3}>
                            <Sticky enabled={true} top={100} >
                                <div>
                                    <h1>
                                        ssqssqsqsqsq
                        </h1>
                                </div>
                            </Sticky>
                        </Col>


                        <Col md={9} className="p-50" style={{ height: '1200px', backgroundColor: "red", marginTop: '100px' }}>
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
