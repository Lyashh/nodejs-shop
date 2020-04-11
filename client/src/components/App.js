import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Container, Row } from 'react-bootstrap'

import Navbar from './elements/navbar'

import Home from './pages/home/home'

class App extends React.Component {

	render() {
		return (
			<Container fluid={true} className="wrapper">
					
					<Router>
						<Switch>
							<Route path="/" exact render={props => <Home {...props} />} />
							<Navbar />
						</Switch>
					</Router>
			</Container>
		);
	}
}

export default App
