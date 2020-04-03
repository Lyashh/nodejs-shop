import React from 'react';
import ReactPageScroller from "react-page-scroller";
import { Container } from 'react-bootstrap'
import Header from './Header'
import Middle from './Middle'


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.child = React.createRef();
		this.state = {
			currentPage: null,
			animationMiddle: false,
			down: false
		};
	}

	handlePageChange = number => {
		this.setState({ currentPage: number });
		if(number === 1) {
			this.setState({ animationMiddle: true });
		} else {
			this.setState({ animationMiddle: false });
		}
	};

	render() {
		return (
			<React.Fragment>
				<ReactPageScroller
					containerWidth={'auto'}
					animationTimer={600}
					pageOnChange={this.handlePageChange}
					customPageNumber={this.state.currentPage}
				>
					<Header />
					<Middle animation={this.state.animationMiddle} />
					
				</ReactPageScroller>
			</React.Fragment>
		);
	}
}

export default Home
