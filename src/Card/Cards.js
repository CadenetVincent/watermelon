// Groups.js

import {Table,Row,Col,Breadcrumb} from 'react-bootstrap';
import React, { Component } from 'react';
import Card from './One_Card';
import { Link } from 'react-router-dom';
import * as DataRequest from '../Data/data_request';

class Cards extends Component {


  constructor(props) {
    super(props);
    this.state = {Card: [],
      Current_card : [],
      is_admin : false};
      this.delete = this.delete.bind(this);
      this.tabRow = this.tabRow.bind(this);
    }


    componentDidMount(){

      this.setState({ Card : DataRequest.get_current_card(this.props.match.params.value)});

    }

    delete(obj) 
    {

      var list_cards = [...this.state.Card]; 

      var index = list_cards.indexOf(obj);

      if (index !== -1) {
        list_cards.splice(index, 1);
        this.setState({Card : list_cards});
      }

      localStorage.setItem("list_cards",JSON.stringify(list_cards));

    }

    tabRow(){

      var mapping = [];


      for (var i = 0; i < this.state.Card.length; i++) {
        mapping.push(<Card delete={this.delete} obj={this.state.Card[i]} key={i} />);
      }

      return mapping;
    }

    render() {
      return (


      <div className="container_main">

      <Breadcrumb>
      <Breadcrumb.Item href="/add_card">
      Add Card
      </Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="title_used"> Cards </h2>

      { this.state.Card == "undefined" ? <h3> You don't have the required rights ! </h3> :

      <Table striped bordered hover className="table_used_school">
      <thead>
      <tr>
      <th>Card ID</th>
      <th>User ID</th>
      <th>Credit number</th>
      <th>Credit type</th>
      <th>Card expiration</th>
      <th>Card CVC</th>
      <th>Card brand</th>
      <th>Card prototype</th>
      <th colSpan="2">Action</th>
      </tr>
      </thead>
      <tbody>

      { this.tabRow() }

      </tbody>
      </Table>

    }

    </div>
    );
  }

}

export default Cards;