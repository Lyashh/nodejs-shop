import React from 'react';
import { Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"


class Pagination extends React.Component {
    render() {
        let pages = []
        for (let i = 0; i < this.props.maxPage; i++) {

            if (Number.parseInt(this.props.currentPage) >= 3 && i + 1 == 1) {
                pages.push(
                    (<Link to={`/shop/${i + 1}`}>
                        <a className="pagin-link">{i + 1}</a>
                    </Link>)
                )
                if (Number.parseInt(this.props.currentPage) > 3) {
                    pages.push(
                        (
                            <a className="pagin-link">...</a>
                        )
                    )
                }
            }

            if (i + 1 > Number.parseInt(this.props.currentPage) - 2 &&
                i + 1 < Number.parseInt(this.props.currentPage) + 2 &&
                i != Number.parseInt(this.props.maxPage) - 1) {

                pages.push(
                    (<Link to={`/shop/${i + 1}`}>
                        <a className="pagin-link">{i + 1}</a>
                    </Link>)
                )
            }

            if (i +1  == Number.parseInt(this.props.maxPage)) {
                if(Number.parseInt(this.props.currentPage) + 2 < Number.parseInt(this.props.maxPage)) {
                    pages.push(
                        (
                            <a className="pagin-link">...</a>
                        )
                    )
                }
                pages.push(
                    (<Link to={`/shop/${i + 1}`}>
                        <a className="pagin-link">{i + 1}</a>
                    </Link>)
                )
            }
        }

        return (
            <Row className="justify-content-center">
                <div className="pagination-wrap">
                    <a className="pagin-link">PREV</a>
                    {pages}
                    <a className="pagin-link">NEXT</a>
                </div>
            </Row>
        );
    }
}

export default Pagination
