import React from 'react';
import preloaderImg from '../../img/preloader/Preloader.gif'
import { Row, Col } from 'react-bootstrap'


class Preloader extends React.Component {

  render() {
    return (
     <Row className="justify-content-center">
            <img className="preloader-img" src={preloaderImg} />
     </Row>
    );
  }
}

export default Preloader
