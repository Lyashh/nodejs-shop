import React from 'react';
import { Col, Row } from 'react-bootstrap'
import Fade from 'react-reveal/Fade';

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: false
        }
    }

    componentDidMount() {
        this.setState({ animation: true })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.position != this.props.position) {
            this.setState({ animation: false })
            this.props.preloader()
            setTimeout(() => {
                this.setState({ animation: true })
            }, 900);
        }
    }

    render() {
        const row = this.props.items.map(el => {
            return (
                <Col md={12} className="tile-item">
                    <img src={`http://localhost:8081/${el.photo_url}`} className="tile-item-img" />
                    <button>ADD TO CART</button>
                    <h2>{el.title}</h2>
                </Col>)
        })
        const tile = this.props.items.map(el => {
            return (
                <Col md={4} className="tile-item">
                    <img src={`http://localhost:8081/${el.photo_url}`} className="tile-item-img" />
                    <button>ADD TO CART</button>
                    <h2>{el.title}</h2>
                </Col>)
        })

        return (
            <Fade duration={700} cascade when={this.state.animation}>
                <div>
                    <Row className="items-row">
                        {this.props.position == 'row' ? row : tile}
                    </Row>
                </div>
            </Fade>
        );
    }
}

export default Items