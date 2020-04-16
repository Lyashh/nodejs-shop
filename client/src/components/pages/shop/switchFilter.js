import React from 'react';
import Switch from "react-switch";

class SwitchFilter extends React.Component {
    constructor() {
        super();
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
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

export default SwitchFilter
