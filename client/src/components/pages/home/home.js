import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
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
					<Row>
						Home
					</Row>
				</Container>
			</Container>
		);
	}
}

export default Home
