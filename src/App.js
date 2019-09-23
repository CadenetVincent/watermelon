import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import {FormControl,Button,Form,Nav,Navbar,Row,Card,Col} from 'react-bootstrap';
import './App.css';

import Authentification from './User/Authentification.js';
import Inscription from './User/Inscription.js';
import Menu from './User/Menu.js';

import Money_deposit from './Transaction/Money_deposit.js';
import Money_see from './Transaction/Money_see.js';
import Money_transit from './Transaction/Money_transit.js';
import Money_withdrawal from './Transaction/Money_withdrawal.js';

import Add_card from './Card/Add_card.js';
import Delete_card from './Card/Delete_card.js';
import Update_card from './Card/Update_card.js';
import See_card from './Card/See_card';

var isAdmin = true;

function App() {
  return (
        
    <Router>
    <div className="post_main">


    <div className="main">

    <Switch>

    <Route exact path="/authentification" component={ Authentification } />
    <Route exact path="/inscription" component={ Inscription } />
    
    <PrivateRoute exact path="/menu" component={Menu} />

    <PrivateRoute exact path="/add_card" component={Add_card} />
    <PrivateRoute exact path="/see_card" component={See_card} />
    <PrivateRoute exact path="/delete_card" component={Delete_card} />
    <PrivateRoute exact path="/update_card" component={Update_card} />

    <PrivateRoute exact path="/money_withdrawal" component={Money_withdrawal} />
    <PrivateRoute exact path="/money_transit" component={Money_transit} />
    <PrivateRoute exact path="/money_see" component={Money_see} />
    <PrivateRoute exact path="/money_deposit" component={Money_deposit} />

    <Route component={NoMatch} />

    </Switch>

    </div>



    </div>
    </Router>
  );
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
  return (
    <Route
      {...rest}
      render={props =>
        (isAdmin == true) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default App;
