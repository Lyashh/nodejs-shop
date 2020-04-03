import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Container } from 'react-bootstrap'

import Home from './pages/home/Home'

class App extends React.Component {

	render() {
		return (
			<Container fluid={true}>
				<Router>
					<Switch>
						<Route path="/" exact render={props => <Home {...props} />} />
					</Switch>
				</Router>
			</Container>
		);
	}
}

export default App
