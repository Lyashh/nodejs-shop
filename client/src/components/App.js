import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'

import Navbar from './elements/navbar'
import Home from './pages/home/home'
import Shop from './pages/shop/shop'
import NotFound from './pages/404'

class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Container fluid={true} className="wrapper" style={{height: '100%'}}>
					<Router>
					{(this.props.page == 'home' || this.props.page == '404') ? null : <Navbar />}
						<Switch>
							<Route path="/" exact render={props => <Home {...props} />} />
							<Route path="/shop" exact render={props => <Shop {...props} />} />
							<Route path="/shop/:page/" exact render={props => <Shop {...props} />} />
							<Route path="*" exact render={props => <NotFound {...props} />} />
						</Switch>
					</Router>
			</Container>
		);
	}
}

export default
	connect(
		state => ({
			page: state.pages.currentPage,
		}),
		dispatch => ({})
	)(App)
