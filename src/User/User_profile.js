import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as DataRequest from "../Data/data_request";

class User_profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr id={this.props.obj.id_users + "_used"}>
                <td>{this.props.obj.id_users}</td>

                <td>{this.props.obj.first_name_users}</td>

                <td>{this.props.obj.last_name_users}</td>

                <td>{this.props.obj.email_users}</td>

                <td>{this.props.obj.password_users}</td>

                <td>{this.props.obj.is_admin_users ? "Yes" : "No"}</td>

                <td>
                    <Link
                        to={"/user/edit/" + this.props.obj.id_users}
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

export default User_profile;
