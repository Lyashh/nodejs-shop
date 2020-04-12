import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

import { Container, Row, Col } from 'react-bootstrap'

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: { min: 2, max: 10 },
        };
    }

    render() {
        return (
            <Container>
                <Row className="main_shop_row">
                    <Col md={9}>
                    </Col>
                    <Col md={3}>
                        <div>
                            <InputRange
                                maxValue={20}
                                minValue={0}
                                value={this.state.value}
                                onChange={value => this.setState({ value })} />
                        </div>
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default Shop
