import React from 'react';
import { Col, Row } from 'react-bootstrap'

class Items extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const row = 'row'
        const tile = this.props.items.map(el => {
            return (
                <Col md={4} className="tile-item">
                    <img src={`http://localhost:8081/${el.photo_url}`} className="tile-item-img" />
                </Col>)
        })


        return (
            <div>
                <Row className="items-row">
                    {this.props.position == 'row' ? row : tile}
                </Row>
            </div>
        );
    }
}

export default Items