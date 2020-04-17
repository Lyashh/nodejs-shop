import React from 'react';
import {  Row, Col } from 'react-bootstrap'


class Pagination extends React.Component {
    render() {
        return (
            <Row className="justify-content-center">
                <div className="pagination-wrap">
                    <a className="pagin-link">PREV</a>
                    <a className="pagin-link">1</a>
                    <a className="pagin-link">2</a>
                    <a className="pagin-link">3</a>
                    <a className="pagin-link">NEXT</a>
                </div> 
            </Row>
        );
    }
}

export default Pagination
