import React from 'react';
import Switch from "react-switch";
import { connect } from 'react-redux'


class SwitchFilter extends React.Component {
    constructor(props) {
        super(props);        
        this.state = { checked: this.props.position == 'tile' ? true : false };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
        if(checked) {
            this.props.setPosition('tile')
        } else {
            this.props.setPosition('row')
        }
        
    }
    render() {
        return (
            <label htmlFor="icon-switch" className="m-none">
                <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    height={33}
                    width={82}
                    onColor={'#955BA5'}
                    offColor={'#14A085'}
                    uncheckedIcon={
                        <div className="switch_div">
                            <img className="tile_icon switch_icons"/>
                        </div>
                    }
                    checkedIcon={
                        <div className="switch_div">
                            <img className="flat_icon switch_icons"/>
                        </div>
                    }
                    className="react-switch"
                    id="icon-switch"
                />
            </label>
        );
    }
}

export default
	connect(
		state => ({
            position: state.itemsFilter.position
        }),
		dispatch => ({
			setPosition: (position) => { dispatch({ type: 'SET_POSITION', payload: position }) }
		})
	)(SwitchFilter)

