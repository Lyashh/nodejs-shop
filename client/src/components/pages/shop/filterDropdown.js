import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'


class Drop extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <DropdownButton id="dropdown-basic-button" title="Default">
                <Dropdown.Item >Action</Dropdown.Item>
                <Dropdown.Item >Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default Drop