import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import Navbar from '../../elements/navbar'
import { connect } from 'react-redux'
//style={{height: `${window.screen.height-200}px`}}
class Home extends React.Component {
	componentDidMount() {
		this.props.setPage('home')
	}

	render() {
		return (
			<Container fluid={true} className="home_header" style={{height: '100%'}}>
				<Container >
					<Row className="justify-content-end">
						<Col md={8}>
							<Navbar />
						</Col>
					</Row>
				</Container>
				<Container >
					<Row className="justify-content-end header-row">
						<Col md={8}>
							<h2 className="header-text-bold">
								Find out why Bonsai Outlet is Ukraine favourite online Bonsai Shop!
							</h2>
							<p className="header-text">
								Here you can buy your bonsai tree. All bonsai are individually photographed and after a purchase in our online shop,
								you get exactly the bonsai tree you have ordered. Safely packed, the tree will be delivered quickly.
								All orders on weekdays until 14 o'clock will be send out on the same day. {this.props.page}
							</p>
							<div className="header-button-div">
								<Button className="main_button">See more</Button>
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
		state => ({
			page: state.pages.currentPage,
		}),
		dispatch => ({
			setPage: (page) => { dispatch({ type: 'SET_PAGE', payload: page }) }
		})
	)(Home)
