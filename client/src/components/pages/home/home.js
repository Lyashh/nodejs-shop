import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import HomeNavbar from '../../elements/homeNavbar'

class Home extends React.Component {

	render() {
		return (
			<Container fluid={true} className="home_header">
				<Container>
					<Row className="justify-content-end">
						<Col md={8}>
							<HomeNavbar />
						</Col>
					</Row>
				</Container>
				<Container >
					<Row className="justify-content-end header-row">
						<Col md={8}>
							<h1 className="header-text-bold">
								Find out why Bonsai Outlet is Ukraine favourite online Bonsai Shop!
							</h1>
							<p className="header-text">
								Here you can buy your bonsai tree. All bonsai are individually photographed and after a purchase in our online shop,
								you get exactly the bonsai tree you have ordered. Safely packed, the tree will be delivered quickly.
								All orders on weekdays until 14 o'clock will be send out on the same day.
							</p>
							<div className="header-button-div">
								<Button>See more</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</Container>
		);
	}
}

export default Home
