import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as DataRequest from "../Data/data_request";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

class One_Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr id={this.props.obj.card_id + "_used"}>
                <td>{this.props.obj.card_id}</td>

                <td>
                    <Link
                        to={"/user/edit/" + this.props.obj.user_id}
                        className="btn btn-primary"
                    >
                        {this.props.obj.user_id}
                    </Link>
                </td>

                <td>{this.props.obj.credit_number}</td>

                <td>{this.props.obj.credit_type}</td>

                <td>{this.props.obj.card_expiration}</td>

                <td>{this.props.obj.card_CVC}</td>

                <td>{this.props.obj.card_brand}</td>

                <td>
                    <Card
                        number={this.props.obj.credit_number}
                        name={DataRequest.get_name_user_from_id(
                            this.props.obj.user_id
                        )}
                        expiry={this.props.obj.card_expiration}
                        cvc={this.props.obj.card_CVC}
                        callback={this.props.obj.credit_number}
                    />
                </td>

                <td>
                    <Link
                        to={"/card/edit/" + this.props.obj.card_id}
                        className="btn btn-primary"
                    >
                        Edit
                    </Link>
                </td>

                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.props.delete(this.props.obj)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default One_Card;
