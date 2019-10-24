  import React, { Component } from "react";
  import {Row,Col,Card,Form,Button,Alert} from 'react-bootstrap';
  import * as DataRequest from '../Data/data_request';
  import { FormErrors } from '../FormErrors';

  import MyMonnaie from './MyMonnaie.js';


  class Create_Wallet extends React.Component {

    constructor(props)
    {
      super(props);

      this.state = {
        balance_error : "",
        actual_wallet : {id_wallet : 0, id_users : 0, balance : 0},
        actual_user : ""
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.redirectFunction = this.redirectFunction.bind(this);
    }

    componentDidMount()
    {
     this.setState({actual_user : DataRequest.get_current_user()})
   }

   redirectFunction(){

    this.props.history.push('/create');

   }

   handleBalanceChange = ({ target }) => {

    const error = DataRequest.check_value_monnaie(target.value);

    if(error != "ready")
    {
      this.setState({ balance_error : error });
    }else
    {
       this.setState({ balance_error : "ready" ,
        actual_wallet : {
          ...this.state.actual_wallet,
          [target.name]: (target.value*100)
        }
      });
    }

 }


 handleSubmit()
 {

  if(this.state.balance_error == "ready")
  {
    var MaxUniqueId = 0;

    var AllWallet = DataRequest.parsing_wallet_file();

    MaxUniqueId = Math.max.apply(Math, AllWallet.map(function(item) { return item.id_wallet; }));
    MaxUniqueId++;

    var newWallet = {id_wallet : MaxUniqueId, 
     id_users : this.state.actual_user.id_users, 
     balance : this.state.actual_wallet.balance};

    AllWallet.push(newWallet);

    localStorage.setItem("list_wallets",JSON.stringify(AllWallet));

    this.props.history.push('/create');

   }

 }

 render() {

  const walletIsExist =  DataRequest.get_current_wallet();

  const DepositIsExist = DataRequest.get_current_transfert("money_deposit",walletIsExist);
  const WithDrawalIsExist = DataRequest.get_current_transfert("money_withdrawal",walletIsExist);
  const TransitIsExist = DataRequest.get_current_transfert("money_transit",walletIsExist);

  const AllNameUsers = DataRequest.get_all_users_name();


  return (

    <div className="container">

    <h2 className="title_used"> Wallet </h2>

    <Row>

    <Col xs={12}>

    <div>
    <Card style={{ width: '18rem' }}>
    <Card.Body>
    <Card.Title> {(walletIsExist == undefined) ? <p>Create a wallet</p> : <p>My Wallet</p> } </Card.Title>
    <Card.Subtitle className="mb-2 text-muted">

    {(walletIsExist == undefined) ? <p>This wallet will be attributed to : <strong> {this.state.actual_user.first_name_users} {this.state.actual_user.last_name_users}</strong></p>
    : <p> Wallet of : <strong> {this.state.actual_user.first_name_users} {this.state.actual_user.last_name_users} </strong> </p>}

    </Card.Subtitle>
    <Card.Text>
    {(walletIsExist == undefined) ? <p>Please enter the amount :</p> : <p> My amount : </p>}
    </Card.Text>

    {(walletIsExist == undefined) ?

      (<div>  

      <Row>

      <Col xs={{ span: 10, offset: 1 }}>

      <Form.Control  
      type="text"
      name="balance"
      placeholder="15.00"
      onChange={this.handleBalanceChange}
      required/>

      </Col>

      </Row>

      <br/>

      <Row>

      <Col xs={{ span: 6, offset: 3 }}>

      <Button type="submit" variant="success" disabled={!(this.state.balance_error == "ready")} onClick={this.handleSubmit}>Validate</Button>

      </Col>


      </Row>

      </div>)

      : (<div><Alert variant="success"> {walletIsExist.balance/100} $ </Alert></div>) }

      <div className="panel panel-default panel_error">
      <FormErrors formErrors={[this.state.balance_error]} />
      </div>

      </Card.Body>
      </Card>
      </div>
      </Col>
      </Row>


      { (walletIsExist != undefined) ?

      <Row>

      <Col xs={12}>
      <hr className="horizontal_form_adm" />
      </Col>

      <Col xs={12}>
      <MyMonnaie wallet={walletIsExist} isExist={DepositIsExist} name="money_deposit" redirect={this.redirectFunction} />
      </Col>

      <Col xs={12}>
      <hr className="horizontal_form_adm" />
      </Col>

      <Col xs={12}>
      <MyMonnaie wallet={walletIsExist} isExist={TransitIsExist} name="money_transit" redirect={this.redirectFunction} />
      </Col> 

      <Col xs={12}>
      <hr className="horizontal_form_adm" />
      </Col>


      <Col xs={12}>
      <MyMonnaie wallet={walletIsExist} AllNameUsers={AllNameUsers} isExist={WithDrawalIsExist} name="money_withdrawal" redirect={this.redirectFunction} />
      </Col>


      </Row>

      : null }

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>


      </div>)

    }

  }

  export default Create_Wallet;