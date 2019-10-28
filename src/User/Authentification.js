import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import * as DataRequest from "../Data/data_request";
import { FormErrors } from "../FormErrors";

class Authentification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email_users: "",
            password_users: "",
            user_connect: "",
            usersExist: [],
            formErrors: "",
            allValid: false
        };

        this.handleInput = this.handleInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            usersExist: DataRequest.parsing_user_file(),
            user_connect: DataRequest.get_current_user()
        });
    }

    handleInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value, formErrors: "" });
    };

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email_users: this.state.email_users,
            password_users: this.state.password_users
        };

        const UserIsExist = this.state.usersExist.filter(function(item) {
            if (
                user.email_users == item.email_users &&
                user.password_users == item.password_users
            ) {
                return item;
            }
        });

        if (UserIsExist.length < 1) {
            this.setState({
                formErrors: { formErrors: "This user does not exist." }
            });
        } else {
            localStorage.setItem(
                "connected_user",
                JSON.stringify(UserIsExist[0])
            );
            window.location = "menu";
            //this.state.props.history("/menu");
        }
    }

    render() {
        return (
            <div className="container">
                <h2 className="title_used"> Authentification </h2>

                <br />

                <Row>
                    <Col xs={{ span: 10, offset: 1 }}>
                        <div class="panel_etablishment">
                            {this.state.user_connect ? (
                                <h3> You are already logged ! </h3>
                            ) : (
                                <form
                                    onSubmit={this.onSubmit}
                                    autoComplete="none"
                                >
                                    <Row>
                                        <Col xs={6}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    name="email_users"
                                                    onChange={this.handleInput}
                                                    value={
                                                        this.state.email_users
                                                    }
                                                />
                                            </div>
                                        </Col>

                                        <Col xs={6}>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    name="password_users"
                                                    onChange={this.handleInput}
                                                    value={
                                                        this.state
                                                            .password_users
                                                    }
                                                />
                                            </div>
                                        </Col>

                                        <Col xs={6}>
                                            <div className="panel panel-default panel_error">
                                                <FormErrors
                                                    formErrors={
                                                        this.state.formErrors
                                                    }
                                                />
                                            </div>
                                        </Col>

                                        <Col xs={{ span: 2, offset: 4 }}>
                                            <div className="label_form">
                                                <input
                                                    className="send_info"
                                                    type="submit"
                                                    value="Login"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Authentification;
