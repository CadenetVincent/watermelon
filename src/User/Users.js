// Groups.js

import {Table,Row,Col,Breadcrumb} from 'react-bootstrap';
import React, { Component } from 'react';
import User_profile from './User_profile';
import { Link } from 'react-router-dom';
import * as DataRequest from '../Data/data_request';

class Users extends Component {


  constructor(props) {
    super(props);
    this.state = {User: []};
    this.delete = this.delete.bind(this);
    this.tabRow = this.tabRow.bind(this);
  }


  componentDidMount(){

    this.setState({ User : DataRequest.parsing_user_file() });

  }

  delete(obj) 
  {

      var list_users = [...this.state.User]; 

      var index = list_users.indexOf(obj);

      if (index !== -1) {
        list_users.splice(index, 1);
        this.setState({User : list_users});
      }

      localStorage.setItem("list_users",JSON.stringify(list_users));

  }

    tabRow(){

      var mapping = [];

      for (var i = 0; i < this.state.User.length; i++) {
        mapping.push(<User_profile delete={this.delete} obj={this.state.User[i]} key={i} />);
      }

      return mapping;
    }

    render() {
      return (
      <div className="container_main">

      <h2 className="title_used"> Users </h2>
      <Table striped bordered hover className="table_used_school">
      <thead>
      <tr>
      <th>#</th>
      <th>First name</th>
      <th>Last name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Is an admin ?</th>
      <th colSpan="2">Action</th>
      </tr>
      </thead>
      <tbody>

      { this.tabRow() }

      </tbody>
      </Table>
      </div>
      );
    }

  }

  export default Users;