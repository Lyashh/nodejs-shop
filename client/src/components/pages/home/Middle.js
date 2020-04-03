import React from 'react';
import { Row, Col } from 'react-bootstrap'
import anime from 'animejs/lib/anime.es.js';


class Middle extends React.Component {
	componentDidMount() {
		this.defaultAnimation()
	}

	componentWillReceiveProps(newProps) {
		if(newProps.animation === true) {
			this.defaultAnimation()
			this.startAnime()
		} else {
			this.defaultAnimation()
		}
	}
	
	defaultAnimation() {
		console.log('def');
		
		anime({
			targets: '.midImg1',
			rotate: ['-25deg', '-25deg'],
		  });
	}

	startAnime() {
		anime({
			duration: 1000,
			targets: '.midImg1',
			rotate: ['-25deg', '10deg'],
			easing: 'easeOutElastic(1, 0.5)',
			elasticity: 600,
		  });
	}


	render() {
		return (
			<Row className='middleRow justify-content-md-center'>
				<Col md={12} className='middleCol'>
					<img className="midImg2" />
					<img className="midImg1"/>
				</Col>
			</Row>
		);
	}
}

export default Middle
