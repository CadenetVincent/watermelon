  import React, { Component } from "react";
  import {FormControl,Button,Form,Nav,Navbar,Row,Card,Col,Breadcrumb} from 'react-bootstrap';
  import { FormErrors } from '../FormErrors';

  class Inscription extends React.Component {

    constructor(props)
    {

      super(props);

      this.state = {

       id_users : "",
       first_name_users : "",
       last_name_users : "",
       email_users : "",
       password_users : "",
       password_users_confirm : "",
       is_admin_users : false,
       formErrors: {id_users : "",first_name_users : "",last_name_users : "",email_users : "",password_users : "",password_users_confirm : "",is_admin_users : false},
       formValid: {first_name_users : false, last_name_users : false, email_users : false, password_users : false, password_users_confirm : false},
       allValid : false
     }

     this.handleInput = this.handleInput.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

   }

   validateForm() {
    this.setState({allValid: this.state.formValid.first_name_users 
                          && this.state.formValid.last_name_users
                          && this.state.formValid.email_users
                          && this.state.formValid.password_users
                          && this.state.formValid.password_users_confirm});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let formValid = this.state.formValid;

    let isValid = this.state.allValid;

    let email_users = this.state.email_users;
    let password_users = this.state.password_users;

    let password_users_confirm = this.state.password_users_confirm;
    let first_name_users = this.state.first_name_users;
    let last_name_users = this.state.last_name_users;

    switch(fieldName) {

      case 'first_name_users':
      formValid.first_name_users = value.length >= 2;
      fieldValidationErrors.first_name_users = formValid.first_name_users ? '' : ' is too short';
      break;

      case 'last_name_users' :
      formValid.last_name_users = value.length >= 2;
      fieldValidationErrors.last_name_users = formValid.last_name_users ? '' : ' is too short';
      break;

      case 'email_users':
      formValid.email_users = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email_users = formValid.email_users ? '' : ' is invalid';
      break;

      case 'password_users_confirm':
      formValid.password_users_confirm = value == password_users ? true : false;
      fieldValidationErrors.password_users_confirm = formValid.password_users_confirm ? '' : ' is invalid';
      break;

      case 'password_users':
      formValid.password_users = value.length >= 6;
      fieldValidationErrors.password_users = formValid.password_users ? '' : ' is too short';
      break;

      default:
      break;
    }

    this.setState({formErrors: fieldValidationErrors,
       allValid : isValid,
       formValid : formValid
    }, this.validateForm);
  }

  onSubmit(e) {

    e.preventDefault();

    this.props.history.push('/menu');

  }



  handleInput = (e) => {
   const name = e.target.name;
   const value = e.target.value;
   this.setState({[name]: value},() => { this.validateField(name, value)});
 }


 render() {


  return (
    <div className="container">

    <h2 className="title_used"> Inscription </h2>

    <br/>

    <Row>

    <Col xs={{ span: 10, offset: 1 }}>

    <div class="panel_etablishment">

    <Form onSubmit={this.onSubmit}>

    <Row>

    <Col xs={6}>
    <Form.Group className="label_form">
    <Form.Label className="info_form" column sm={3}>
    First name : 
    </Form.Label>
    <Col sm={9}>
    <Form.Control
    type="text"  
    value={this.state.first_name_users}
    onChange={this.handleInput}
    name="first_name_users"
    />
    </Col>
    </Form.Group>
    </Col>

    <Col xs={6}>
    <Form.Group className="label_form">
    <Form.Label className="info_form" column sm={3}>
    Last name :
    </Form.Label>
    <Col sm={9}>
    <Form.Control  
    type="text" 
    value={this.state.last_name_users}
    onChange={this.handleInput}
    name="last_name_users"/>
    </Col>
    </Form.Group>
    </Col>

    <Col xs={6}>
    <Form.Group className="label_form">
    <Form.Label className="info_form" column sm={3}>
    E-mail :
    </Form.Label>
    <Col sm={9}>
    <Form.Control  
    type="email" 
    value={this.state.email_users}
    onChange={this.handleInput}
    name="email_users"/>
    </Col>
    </Form.Group>
    </Col>

    <Col xs={6}>
    <Form.Group className="label_form">
    <Form.Label className="info_form" column sm={3}>
    Password :
    </Form.Label>
    <Col sm={9}>
    <Form.Control  
    type="password" 
    value={this.state.password_users}
    onChange={this.handleInput}
    name="password_users"/>
    </Col>
    </Form.Group>
    </Col>

    <Col xs={6}>
    <Form.Group className="label_form">
    <Form.Label className="info_form" column sm={3}>
    Confirm password :
    </Form.Label>
    <Col sm={9}>
    <Form.Control  
    type="password" 
    value={this.state.password_users_confirm}
    onChange={this.handleInput}
    name="password_users_confirm"/>
    </Col>
    </Form.Group>
    </Col>


    <Col xs={6}>
    <Form.Check label="admin" aria-label="option 1" />
    </Col>

    <Col xs={6}>
    <div className="panel panel-default panel_error">
    <FormErrors formErrors={this.state.formErrors} />
    </div>
    </Col>

    <Col xs={{ span: 2, offset: 4 }}>
    <div className="label_form">
    <input className="send_info" type="submit" disabled={!this.state.allValid} value="Send"/>
    </div>
    </Col>

    </Row>

    </Form>

    </div>

    </Col>

    </Row>

    </div>)

}

}

export default Inscription;