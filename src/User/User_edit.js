// User_edit.component.js

import React, { Component } from 'react';
import {Form,Row,Col,Breadcrumb} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as DataRequest from '../Data/data_request';
import { FormErrors } from '../FormErrors';


class User_edit extends Component {

  constructor(props) {
    super(props);
    this.handleTableInput = this.handleTableInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateField = this.validateField.bind(this);

    this.state = {
     list_user : [],
     user_used : "",
     user_connected : "",
     formErrors: {first_name_users : "",last_name_users : "",email_users : "",password_users : "",is_admin_users : false, is_exist : ""},
   }
 }

 componentDidMount() {

  var list_user = DataRequest.parsing_user_file();
  var user_used = "";

  for (var i = list_user.length - 1; i >= 0; i--) {
    if(list_user[i].id_users == this.props.match.params.id)
    {
      user_used = list_user[i];
    }
  }

  this.setState({ list_user : list_user,
                  user_used : user_used,
                  user_connected : DataRequest.get_current_user()});
 }



handleTableInput = (e) => {
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

validateField(fieldName, value) {

    var formErrors = this.state.formErrors;
    formErrors.is_exist = "";

    let user = {password_users : this.state.password_users};

   formErrors = DataRequest.validate_field_user(fieldName,value,formErrors,user);

    this.setState({formErrors: formErrors,
    }, this.validateForm);
  }

handleCheck = (e) => {

   this.setState({
  user_used : {
    ...this.state.user_used,
    is_admin_users : !this.state.user_used.is_admin_users
  }
});
}

onSubmit(e) {

  e.preventDefault();

    var list_users = this.state.list_user; 

    const user_used = this.state.user_used;

    var index_user = -1;

    for (var i = list_users.length - 1; i >= 0; i--) {

      if(list_users[i].id_users == user_used.id_users)
      {
        index_user = list_users.indexOf(list_users[i]);
      }
    }


    if(index_user != -1)
    {

    list_users[index_user] = user_used;

    localStorage.setItem("list_users",JSON.stringify(list_users));

    }

    if(this.state.user_connected.id_users == this.state.user_used.id_users)
    {
     localStorage.setItem("connected_user",JSON.stringify(user_used));

     this.props.history.push('/menu');
    }else
    {
    this.props.history.push('/users');
    }
}

render() {
  return (
    <div className="container_main">

    {this.state.user_used ? 

    <div>
    <Breadcrumb>
    <Breadcrumb.Item href="/users">See users</Breadcrumb.Item>
    </Breadcrumb>

    <h3 className="title_admin" align="center">User edit</h3>

    <Row>

    <Col xs={{ span: 10, offset: 1 }}>


    <div className="container">

    <br/>

    <Row>

    <Col xs={{ span: 10, offset: 1 }}>

    <div class="panel_etablishment">

    <Form onSubmit={this.onSubmit}   autoComplete="none">

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
    onChange={this.handleTableInput}
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
    onChange={this.handleTableInput}
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
    onChange={this.handleTableInput}
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
    type="text" 
    value={this.state.user_used.password_users}
    onChange={this.handleTableInput}
    name="password_users"/>
    </Col>
    </Form.Group>
    </Col>

    <Col xs={6}>
    <Form.Check 
    label="admin" 
    aria-label="option 1"
    onClick={this.handleCheck} defaultChecked={this.state.user_used.is_admin_users}/>
    </Col>

    <Col xs={{ span: 2, offset: 4 }}>
    <div className="label_form">
    <input className="send_info" type="submit" value="Send"/>
    </div>
    </Col>

    <Col xs={6}>
    <div className="panel panel-default panel_error">
    <FormErrors formErrors={this.state.formErrors} />
    </div>
    </Col>

    </Row>

    </Form>

    </div>

    </Col>

    </Row>

      </div>

      </Col>

      </Row>
      </div>

      : <h3>No users spotted</h3> }

      </div>
      )
  }
}

export default User_edit;