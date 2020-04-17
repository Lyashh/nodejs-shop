import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import { Col } from 'react-bootstrap'


class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            priceFilter: { min: 35, max: 89 },
            ageFilter: { min: 1, max: 12 },
            cateroryFilter: [
                { id: 1, title: 'Beginner Bonsai Trees', checked: true },
                { id: 2, title: 'DIY Bonsai Starter Kits', checked: true },
                { id: 3, title: 'Indoor Bonsai Trees', checked: true },
                { id: 4, title: 'Outdoor Bonsai Trees', checked: true }
            ]
        };
    }

    handleCheckbox = (e) => {
        const newCategory = this.state.cateroryFilter.map(el => {
            if(el.id == e.target.id.split('_')[1]) {
                el.checked = !el.checked
                return el
            }
            return el
        })
        this.setState({cateroryFilter: newCategory})        
    }


    render() {

        const category = this.state.cateroryFilter.map((el) => {
            return (
                <div key={el.id}>
                    <input
                        type="checkbox"
                        className="categoryInput"
                        onClick={this.handleCheckbox}
                        id={`box_${el.id}`} />
                    <label htmlFor={`box_${el.id}`}>{el.title}</label>
                </div>
            )
        })

        return (
                    <header  className="p-100">
                        <div className="filter_component">
                            <p className="filter_text">CATEGORIES</p>
                            {category}
                        </div>
                        <div className="filter_component price_filter">
                            <p className="filter_text">FILTER BY PRICE</p>
                            <InputRange
                                formatLabel={priceFilter => `${priceFilter}$`}
                                maxValue={200}
                                minValue={36}
                                value={this.state.priceFilter}
                                onChange={priceFilter => this.setState({ priceFilter })} />
                        </div>
                        <div className="filter_component age_filter">
                            <p className="filter_text">FILTER BY AGE</p>
                            <InputRange
                                maxValue={12}
                                minValue={1}
                                value={this.state.ageFilter}
                                onChange={ageFilter => this.setState({ ageFilter })} />
                        </div>
                    </header>
                        );
    }
}

export default Filter