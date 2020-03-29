import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Home from './pages/Home'


class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<Router>
						<Switch>
							<Route path="/" exact render={ props => <Home {...props} /> } />
						</Switch>
				</Router>
			</div>
		);
	}
}

export default App
