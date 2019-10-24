import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import {FormControl,Button,Form,Nav,Navbar,Row,Card,Col} from 'react-bootstrap';
import './App.css';

import Authentification from './User/Authentification.js';
import Inscription from './User/Inscription.js';
import Menu from './User/Menu.js';
import Users from './User/Users.js';
import User_edit from './User/User_edit.js';

import NavbarMenu from './User/Navbarmenu.js';

import Money_deposit from './Transaction/Money_deposit.js';
import Money_see from './Transaction/Money_see.js';
import Money_transit from './Transaction/Money_transit.js';
import Money_withdrawal from './Transaction/Money_withdrawal.js';
import Create_Wallet from './Transaction/Create_Wallet.js';

import Add_card from './Card/Add_card.js';
import Delete_card from './Card/Delete_card.js';
import Update_card from './Card/Update_card.js';
import Cards from './Card/Cards';

import * as DataRequest from './Data/data_request';



class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {user_used : ""};
    this.logoutuser = this.logoutuser.bind(this);
  }

  logoutuser()
  {

    localStorage.removeItem("connected_user");

    if(typeof this.history !== 'undefined')
    {
      this.history.push('/authentification');
    }else
    {
      window.location = "/authentification";
    }

  }

  render(){

    return (

      <Router>
      <div className="post_main">

      <div className="main">

      <NavbarMenu logoutuser={this.logoutuser} />

      <Switch>

      <Route exact path="/authentification" component={ Authentification } />
      <Route exact path="/inscription" component={ Inscription } />
      <PrivateRoute exact path="/menu" component={Menu} />

      <PrivateRoute exact path="/add_card" component={Add_card} />
      <PrivateRoute exact path="/cards/:value" component={Cards} />
      <PrivateRoute exact path="/delete_card" component={Delete_card} />
      <PrivateRoute exact path="/card/edit/:id" component={Update_card} />

      <PrivateRoute exact path="/users" component={Users} />
      <PrivateRoute exact path='/user/edit/:id' component={ User_edit } />

      <PrivateRoute exact path="/money_withdrawal" component={Money_withdrawal} />
      <PrivateRoute exact path="/money_transit" component={Money_transit} />
      <PrivateRoute exact path="/money_see" component={Money_see} />
      <PrivateRoute exact path="/money_deposit" component={Money_deposit} />
      <PrivateRoute exact path="/create" component={Create_Wallet} />

      <Route component={NoMatch} />

      </Switch>

      </div>

      </div>
      </Router>
      );

    }
  }

  function NoMatch({ location }) {
    return (
    <div>
    <h3>
    <p> <i class="fas fa-bug"></i> No match for <code>{location.pathname}</code></p>
    </h3>
    </div>
    );
  }

  function PrivateRoute({ component: Component, ...rest }) {

    var isConnect = DataRequest.get_current_user();

    return (
    <Route
    {...rest}
    render={props =>
      (isConnect) ? (
      <Component {...props} />
      ) : (
      <Redirect
      to={{
        pathname: "/authentification",
        state: { from: props.location }
      }}
      />
      )
    }
    />
    );
  }

  export default App;
