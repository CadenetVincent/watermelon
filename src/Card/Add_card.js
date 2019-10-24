import React from 'react';
import { render } from 'react-dom';
import Card from 'react-credit-cards';
import {FormControl,Button,Form,Nav,Navbar,Row,Col,Breadcrumb} from 'react-bootstrap';
import * as DataRequest from '../Data/data_request';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormErrors } from '../FormErrors';
import 'react-credit-cards/es/styles-compiled.css';

export default class Add_Card extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      card_used : {number: '',name: '',cvc: '',card_type : "",bank_name : "",date: new Date(),is_exist : ""},
      formErrors: {number: '',name: '',cvc: '',card_type : "",bank_name : "",date: ""},
      allValid : false,
      user_name_list : [],
      cardExist : [],
      banknames : [],
      filtering : "",
      expiry: '',
      focused: '',
      issuer: ''

    };

    this.handleDateChangeCardUsed = this.handleDateChangeCardUsed.bind(this);
    this.handleTypeChangeCardUsed = this.handleTypeChangeCardUsed.bind(this);
    this.handleChangeCardUsed = this.handleChangeCardUsed.bind(this);
    this.filteringChange = this.filteringChange.bind(this);
    this.validateField = this.validateField.bind(this);

  }

  validateForm() {
    this.setState({allValid: (this.state.formErrors.number == "ready")
      && (this.state.formErrors.name == "ready")
      && (this.state.formErrors.cvc == "ready")
      && (this.state.formErrors.card_type == "ready")
      && (this.state.formErrors.bank_name == "ready")
      && (this.state.formErrors.date == "ready") });
  }

  validateField(fieldName, value) {

    var formErrors = this.state.formErrors;
    formErrors.is_exist = "";

    formErrors = DataRequest.validate_field_card(fieldName,value,formErrors);

    this.setState({formErrors: formErrors,
    }, this.validateForm);


  }

  componentDidMount()
  {
    const ExistingUsers = DataRequest.get_all_users_name()[0];

    this.setState({ formErrors : {
        ...this.state.formErrors,
        name : Array.isArray(ExistingUsers) ? this.state.formErrors.name : "ready"
      }, user_name_list : DataRequest.get_all_users_name()[0],
      banknames : DataRequest.parsing_bank_name(),
      cardExist : DataRequest.parsing_card_file()}
      );
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleDateChangeCardUsed = mydate => {

    var expiration = DataRequest.date_format_json_to_date_picker(DataRequest.date_to_date_format_json(mydate));

    if(expiration == false)
    {
      mydate = new Date();
      expiration = DataRequest.date_format_json_to_date_picker(DataRequest.date_to_date_format_json(mydate));
    }

    this.setState({
      card_used : {
        ...this.state.card_used,
        date : mydate,
      },expiry : expiration

    },() => {this.validateField("date",mydate)});
  }


  handleTypeChangeCardUsed = ({ target }) => {

    this.setState({
      card_used : {
        ...this.state.card_used,
        number : DataRequest.get_random_pattern(target.value),
        card_type : target.value
      },
      formErrors : {
        ...this.state.formErrors,
        number : "Credit card number is too short."
      }
    },() => {this.validateField(target.name,target.value)});

  }


  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    this.setState({
      card_used : {
        ...this.state.card_used,
        [target.name]: target.value
      },card_type : target.value
    },() => {this.validateField(target.name,target.value)});

  };

  handleChangeCardUsed = ({ target }) => {

   this.setState({
    card_used : {
      ...this.state.card_used,
      [target.name]: target.value
    }
  },() => {this.validateField(target.name,target.value)});

 }


 filteringChange = ({target}) => {

  var list_bank_name = DataRequest.parsing_bank_name();

  list_bank_name = list_bank_name.filter(function (item){

    const compare_item = item.replace(/\s/g, '').toLowerCase();
    const compare_target = target.value.replace(/\s/g, '').toLowerCase();

    if(compare_item.indexOf(compare_target) > -1)
    {
      return item;
    }

  });

  this.setState({ 
    formErrors : {
      ...this.state.formErrors,
      bank_name : "Re-select a new bank name."
    },banknames : list_bank_name});


};

handleSubmit = e => {

  e.preventDefault();

  var MaxUniqueId = 0;

  var card = {
    card_id : 0,
    user_id : 0,
    credit_number : this.state.card_used.number,
    credit_type : this.state.card_used.card_type,
    card_expiration : DataRequest.date_to_date_format_json(this.state.card_used.date),
    card_brand : this.state.card_used.bank_name,
    card_CVC : this.state.card_used.cvc };
    
    card.user_id = DataRequest.get_id_user_from_name(this.state.card_used.name);


    var CardIsExist = this.state.cardExist.filter(function (item) {

      if(card.credit_number == item.credit_number)
      {
        return item;
      }

    });


    if (CardIsExist.length > 0){

      this.setState({formErrors : {...this.state.formErrors, is_exist: "This card already exists."}});

    }else if(this.state.allValid == true)
    {

      MaxUniqueId = Math.max.apply(Math, this.state.cardExist.map(function(item) { return item.card_id; }));
      MaxUniqueId++;

      card.card_id = MaxUniqueId;

      var list_cards = this.state.cardExist;
      list_cards.push(card);

      localStorage.setItem("list_cards",JSON.stringify(list_cards));

      this.props.history.push('/cards/all');

    }



  };

  render() {
    const {focused, issuer} = this.state;

    const CardTypes = DataRequest.parsing_card_type_file();

    return (
      <div className="container">

      <h2 className="title_used"> Add card </h2>

      <br/>

      <Row>

      <Col xs={{ span: 10, offset: 1 }}>

      <div class="panel_etablishment">

      <Card
      number={this.state.card_used.number}
      name={Array.isArray(this.state.user_name_list) ? this.state.card_used.name : this.state.user_name_list}
      expiry={this.state.expiry}
      cvc={this.state.card_used.cvc}
      focused={focused}
      callback={this.handleCallback}
      />

      <br/>

      <Col xs={12}>
      <hr className="horizontal_form_adm" />
      </Col>

      <Form onSubmit={this.handleSubmit}>

      <Row>

      <Col xs={6}>

      <Form.Group className="label_form">
      <Form.Label className="info_form" column xs={{ span: 6, offset: 3 }}>
      Credit type :
      </Form.Label>
      <Form.Control
      as="select"
      name="card_type"
      className="form-control"
      required
      onChange={this.handleTypeChangeCardUsed}>
      onFocus={this.handleInputFocus}
      <option value="undefined">Select a card type...</option>
      {

        Object.keys(CardTypes).map((obj, i) => {
          return (
          <option key={obj}>{CardTypes[obj].niceType}</option>
          )})

        }
        </Form.Control>
        </Form.Group>

        </Col>

        <Col xs={6}>

        <Form.Group className="label_form">
        <Form.Label className="info_form" column xs={{ span: 6, offset: 3 }}>
        Credit number :
        </Form.Label>
        <Form.Control  
        type="text"
        name="number"
        className="form-control"
        placeholder="49XX XXXX XXXX XXXX"
        required
        value={this.state.card_used.number}
        onChange={this.handleChangeCardUsed}
        onFocus={this.handleInputFocus}/>
        </Form.Group>

        </Col>

        <Col xs={12}>
        <hr className="horizontal_form_adm" />
        </Col>


        <Col xs={12}>

        <Form.Group className="label_form">

        <Form.Label className="info_form" column xs={{ span: 8, offset: 2 }}>
        Bank name :
        </Form.Label>

        <Row>

        <Col xs={8}>

        <Form.Control 
        id="bank"
        as="select"
        name="bank_name"
        className="form-control"
        required
        onChange={this.handleChangeCardUsed}
        onFocus={this.handleInputFocus}>
        <option value="undefined">Select a bank name...</option>
        {this.state.banknames.map(item => (
          <option key={item}>{item}</option>
          ))}
          </Form.Control>

          </Col>

          <Col xs={3}>

          <Form.Control  
          type="text"
          name="filtering"
          className="form-control"
          placeholder="filter the name"
          onInput={this.filteringChange}/>

          </Col>

          </Row>

          </Form.Group>

          </Col>

          <Col xs={12}>
          <hr className="horizontal_form_adm" />
          </Col>


          <Col xs={6}>
          <Form.Group as={Row} className="label_form">
          <Form.Label className="info_form" column xs={{ span: 6, offset: 3 }}>
          User name :
          </Form.Label>

          {

            Array.isArray(this.state.user_name_list) ?

            <Form.Control 
            as="select"
            name="name"
            className="form-control"
            placeholder="Name"
            required
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}>
            <option value="undefined">Select a user name...</option>
            {(this.state.user_name_list).map(item => (
              <option key={item}>{item}</option>
              ))}
              </Form.Control>

              : 

              <Col xs={12}>

              <Form.Control  
              name="name"
              className="form-control"
              placeholder="Name"
              required
              value={this.state.user_name_list}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}/>
              </Col> 

            }

            </Form.Group>
            </Col>

            <Col xs={{ span: 4, offset: 1 }}>

            <Form.Label className="info_form" column sm={12}>
            Date (MM/DD/YY) :
            </Form.Label>

            <Col xs={12}>

            <DatePicker
            selected={this.state.card_used.date}
            onChange={this.handleDateChangeCardUsed}
            onFocus={this.handleInputFocus}
            name="date"
            className="DatePicker"
            dateFormat="MM/dd/yyyy"/>

            </Col>

            </Col>

            <Col xs={12}>
            <hr className="horizontal_form_adm" />
            </Col>

            <Col xs={6}>

            <Form.Group className="label_form">
            <Form.Label className="info_form" column xs={{ span: 6, offset: 3 }}>
            CVC :
            </Form.Label>
            <Form.Control  
            type="tel"
            name="cvc"
            className="form-control"
            placeholder="CVC"
            pattern="\d{3,4}"
            required
            onChange={this.handleChangeCardUsed}
            onFocus={this.handleInputFocus}/>
            </Form.Group>

            </Col>

            <input type="hidden" name="issuer" value={issuer} />

            <Col xs={{ span: 2, offset: 4 }}>
            <div className="label_form">
            <input className="send_info" type="submit" disabled={!this.state.allValid} value="Send"/>
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
            );
          }
        }


