import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

class Home extends React.Component {
    componentDidMount() {
        this.props.setPage('404')
    }

    render() {
        return (
            <Container fluid={true} className="home_header" style={{ height: '100%' }}>
                <Container >
                    <Row className="justify-content-end">
                        <Col md={8}>
                            <h1 className="title_404">404</h1>
                            <p className="text_404">Page not found</p>
                            <div className="button_div_404">
                                <Link to="/">
                                    <Button className="main_button">Back to home</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default
    connect(
        state => ({}),
        dispatch => ({
            setPage: (page) => { dispatch({ type: 'SET_PAGE', payload: page }) }
        })
    )(Home)
