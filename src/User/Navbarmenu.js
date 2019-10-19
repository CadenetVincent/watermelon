  import React, { Component } from "react";
  import {Nav,Navbar} from 'react-bootstrap';
  import { Link } from 'react-router-dom';
  import { withRouter } from 'react-router-dom';
  import * as DataRequest from '../Data/data_request';

  class Navbarmenu extends React.Component {

    constructor(props)
    {
      super(props);
      this.state = {user_used : ""};
      this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount()
    {
      this.setState({user_used : DataRequest.get_current_user()});
    }



    onLogout(e) {
      e.preventDefault();
      this.setState({ user_used : "" });
      this.props.logoutuser();

    }


    render(){

      const authLinks = (
        <div className="logout_btn">
        <a className="nav-link" onClick={this.onLogout}>
        Logout
        </a>
        </div>
        )

      
      const guestLinks = (

        <div className="sign_in_up">

        <div className="sign_in_btn">
        <Nav.Link className="button_login" href="/inscription">Sign Up</Nav.Link>
        </div>

        <div className="sign_up_btn">
        <Nav.Link className="button_login" href="/authentification">Sign In</Nav.Link>
        </div>

        </div>

        )

      return (
        <Navbar bg="light" variant="light">
        <Navbar.Brand className="navbar_title" href="/menu"> &nbsp; <strong>Watermelon</strong> &nbsp; </Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link className="navbar_link" href="/menu"><div><i class="fas fa-ellipsis-v"></i> Menu</div></Nav.Link>
        <Nav.Link className="navbar_link" href="/users"><div><i class="fas fa-ellipsis-v"></i> Users</div></Nav.Link>
        <Nav.Link className="navbar_link" href="/see_card"><div><i class="fas fa-graduation-cap"></i> Cards</div></Nav.Link>
        <Nav.Link className="navbar_link" href="/money_see"><div><i class="fas fa-users"></i> Transaction</div></Nav.Link>
        </Nav>

        {this.state.user_used ? authLinks : guestLinks}


        </Navbar> )
      }

    }



export default Navbarmenu;