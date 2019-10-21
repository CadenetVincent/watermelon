import React, { Component } from "react";
import {Row,Col} from 'react-bootstrap';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
 
export default class See_card extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };
 
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }
  
  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focus={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form>
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          ...
        </form>
      </div>
    );
  }
}
