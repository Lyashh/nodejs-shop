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
        if (prevProps.position != this.props.position || prevProps.items != this.props.items) {
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
                <Col md={12} className="row-item">
                    <Row>
                        <Col md={4}>
                            <img src={`http://localhost:8081/${el.photo_url}`} className="row-item-img" />
                        </Col>
                        <Col md={8} className="row-item-detail">
                            <h2>{el.title}</h2>
                            <h4>{el.age} {el.age == 1 ? "year " : "years "}old</h4>
                            <p>{el.description}</p>
                            <div className="row-item-price">
                                <button className="row-btn-item">Add To Cart</button>
                                <span>{el.price}$</span>
                            </div>
                           
                        </Col>
                    </Row>
                </Col>)
        })
        const tile = this.props.items.map(el => {
            return (
                <Col md={4} className="tile-item">
                    <img src={`http://localhost:8081/${el.photo_url}`} className="tile-item-img" />
                    <button>ADD TO CART</button>
                    <h2 className={el.title.length > 26 ? "fixed-h-40" : ""}>{el.title}</h2>
                    <p className="tile-item-price">
                        <span className="bg-pink">{el.age} {el.age == 1 ? "year " : "years "}old - {el.price}$</span>
                    </p>
                </Col>)
        })

        return (
            <Fade duration={900} delay={100} cascade when={this.state.animation}>
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