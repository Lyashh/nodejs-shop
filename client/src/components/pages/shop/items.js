import React from 'react';
import { Col } from 'react-bootstrap'

class Items extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const row = 'row'
        const tile= 'tile'
        return (
           <div>
               {this.props.position == 'row' ? row : tile}
           </div>
        );
    }
}

export default Items