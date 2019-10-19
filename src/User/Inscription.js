  import React, { Component } from "react";
  import {FormControl,Button,Form,Nav,Navbar,Row,Card,Col,Breadcrumb} from 'react-bootstrap';
  import { FormErrors } from '../FormErrors';
  import * as DataRequest from '../Data/data_request';



  class Inscription extends React.Component {

    constructor(props)
    {

      super(props);

      this.state = {

       user_used : "",
       formErrors: {first_name_users : "",last_name_users : "",email_users : "",password_users : "",password_users_confirm : "",is_admin_users : false, is_exist : ""},
       usersExist : [],
       allValid : false

     }

     this.handleInput = this.handleInput.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
     this.handleCheck = this.handleCheck.bind(this);
     this.validateField = this.validateField.bind(this);

   }

   componentDidMount()
   {
     this.setState({ usersExist: DataRequest.parsing_user_file() });
   }

   validateForm() {
    this.setState({allValid: (this.state.formErrors.first_name_users == "ready")
      && (this.state.formErrors.last_name_users == "ready")
      && (this.state.formErrors.email_users == "ready")
      && (this.state.formErrors.password_users == "ready")
      && (this.state.formErrors.password_users_confirm == "ready") });
   }

  validateField(fieldName, value) {

    var formErrors = this.state.formErrors;
    formErrors.is_exist = "";

    let user = {
      password_users : this.state.password_users,
      password_users_confirm : this.state.password_users_confirm
    };

   formErrors = DataRequest.validate_field_user(fieldName,value,formErrors,user);

    this.setState({formErrors: formErrors,
    }, this.validateForm);
  }

  onSubmit(e) {

    e.preventDefault();

    var MaxUniqueId = 0;

    var user = {
      id_users : 0,
      first_name_users : this.state.user_used.first_name_users,
      last_name_users : this.state.user_used.last_name_users,
      email_users : this.state.user_used.email_users,
      password_users : this.state.user_used.password_users,
      password_users_confirm : this.state.user_used.password_users_confirm,
      is_admin_users : this.state.user_used.is_admin_users
    };

    const UserIsExist = this.state.usersExist.filter(function (item) {

      if((user.first_name_users == item.first_name_users
      && user.last_name_users == item.last_name_users)
      || user.email_users == item.email_users)
      {
        return item;
      }

    });

    if (UserIsExist.length > 0){

      this.setState({formErrors : {...this.state.formErrors, is_exist: "This user already exists."}});

    }else if(this.state.allValid == true)
    {

    MaxUniqueId = Math.max.apply(Math, this.state.usersExist.map(function(item) { return item.id_users; }));
    MaxUniqueId++;

    user.id_users = MaxUniqueId;

    var list_users = this.state.usersExist;
    list_users.push(user);

    this.setState({usersExist : list_users});

    localStorage.setItem("list_users",JSON.stringify(list_users));

    this.props.history.push('/authentification');

    }

  }


handleInput = (e) => {
 const name = e.target.name;
 const value = e.target.value;


  this.setState({
  user_used : {
    ...this.state.user_used,
    [name] : e.target.value,
  }
},
() => {this.validateField(name,value)});
}

handleCheck = (e) => {

   this.setState({
  user_used : {
    ...this.state.user_used,
    is_admin_users : !this.state.user_used.is_admin_users
  }
});
}

render() {


  return (
    <div className="container">

    <h2 className="title_used"> Inscription </h2>

    <br/>

    <Row>

    <Col xs={{ span: 10, offset: 1 }}>

    <div class="panel_etablishment">

    <Form onSubmit={this.onSubmit} autoComplete="none">

    <Row>

    <Col xs={6}>
    <Form.Group className="label_form">
    <Form.Label className="info_form" column sm={3}>
    First name : 
    </Form.Label>
    <Col sm={9}>
    <Form.Control
    type="text"  
    value={this.state.user_used.first_name_users}
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
    value={this.state.user_used.last_name_users}
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
    value={this.state.user_used.email_users}
    onChange={this.handleInput}
    name="email_users"
    autoComplete="none"/>
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
    value={this.state.user_used.password_users}
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
    value={this.state.user_used.password_users_confirm}
    onChange={this.handleInput}
    name="password_users_confirm"/>
    </Col>
    </Form.Group>
    </Col>


    <Col xs={6}>
    <Form.Check 
    label="admin" 
    aria-label="option 1"
    onClick={this.handleCheck} />
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