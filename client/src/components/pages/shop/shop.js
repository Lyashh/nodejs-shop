import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: { min: 2, max: 10 },
        };
    }

    componentDidMount() {
		this.props.setPage('shop')
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

export default
	connect(
		state => ({}),
		dispatch => ({
			setPage: (page) => { dispatch({ type: 'SET_PAGE', payload: page }) }
		})
	)(Shop)
