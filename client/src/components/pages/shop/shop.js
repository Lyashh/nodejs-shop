import React from 'react';

import Filter from './filter'
import FilterRow from './filterRow'
import Header from './header'
import Items from './items'
import PaginationCompoment from '../../elements/pagination'

import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Sticky from 'react-stickynode';
import { withRouter } from "react-router-dom"

import { Pagination } from '../../../functions/requests/items'


class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            items: []
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.page) {
            this.props.setItemPage(this.props.match.params.page)
            this.getItems()
        } else {
            this.props.setItemPage(1)
            this.getItems()
        }
        this.props.setPage('shop')
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }


    getItems() {
        Pagination(this.props.itemPage, this.props.quantity)
            .then(res => {
                if (res.status == 200) {
                    this.setState({ items: res.data.items })
                }
            })
            .catch(err => console.log(err))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.quantity != this.props.quantity || prevProps.itemPage != this.props.itemPage) {
            this.getItems()
        }
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
                            grgrgr
                            <PaginationCompoment />
                            <Items position={this.props.position} items={this.state.items} />
                          
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
            position: state.itemsFilter.position,
            quantity: state.itemsFilter.quantity,
            itemPage: state.itemsFilter.page
        }),
        dispatch => ({
            setPage: (page) => { dispatch({ type: 'SET_PAGE', payload: page }) },
            setItemPage: (page) => { dispatch({ type: 'SET_ITEM_PAGE', payload: page }) },
        })
    )(Shop))
