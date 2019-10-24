  import React, { Component } from "react";
  import {Row,Col,Card,Form,Button} from 'react-bootstrap';
  import * as DataRequest from '../Data/data_request';
  import { FormErrors } from '../FormErrors';

  class Money_deposit extends React.Component {

    constructor(props)
    {
      super(props);

      this.state = {
        deposit_error : "",
        paiement : {amount : 0, name_user : ""},
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handledepositChange = this.handledepositChange.bind(this);
      this.handleUserName = this.handleUserName.bind(this);
    }

    handledepositChange = ({ target }) => {

      const error = DataRequest.check_value_monnaie(target.value);

      if(error != "ready")
      {
        this.setState({ deposit_error : error });
      }else
      {
       this.setState({ deposit_error : "ready" ,
        paiement : {
          ...this.state.paiement,
          [target.name]: (target.value*100)
        }
      });
     }

   }

   handleUserName = ({ target }) => 
   {

    this.setState({ deposit_error : "",
      paiement : {
        ...this.state.paiement,
        [target.name]: (target.value)
      }
    });

  }

  handleSubmit(e)
  {

    e.preventDefault();

    if(this.state.deposit_error == "ready")
    {
      var MaxUniqueId = 0;

      var obj = "";

      var Alldeposit = DataRequest.parsing_money(this.props.name);

      const AllWallet = DataRequest.parsing_wallet_file();

      var actual_wallet = this.props.wallet;

      var error = "start";


      if(this.props.name == "money_deposit")
      {

        if(Alldeposit == undefined){
          Alldeposit = [];
          MaxUniqueId = 1;
        }else
        {
          MaxUniqueId = Math.max.apply(Math, Alldeposit.map(function(item) { return item.id_pay_out; }));
          MaxUniqueId++;
        }

        obj = {id_pay_out : MaxUniqueId, 
          id_wallet : this.props.wallet.id_wallet,
          amount : this.state.paiement.amount}

          actual_wallet.balance = actual_wallet.balance + obj.amount;

        }

        if(this.props.name == "money_transit")
        {

          if(Alldeposit == undefined){
            Alldeposit = [];
            MaxUniqueId = 1;
          }else
          {
            MaxUniqueId = Math.max.apply(Math, Alldeposit.map(function(item) { return item.id_pay_in; }));
            MaxUniqueId++;
          }

          obj = {id_pay_in : MaxUniqueId, 
           id_wallet : this.props.wallet.id_wallet,
           amount : this.state.paiement.amount}

           actual_wallet.balance = actual_wallet.balance - obj.amount;

         }

         if(this.props.name == "money_withdrawal")
         {

          if(Alldeposit == undefined){
            Alldeposit = [];
            MaxUniqueId = 1;
          }else
          {
            MaxUniqueId = Math.max.apply(Math, Alldeposit.map(function(item) { return item.id_transfer; }));
            MaxUniqueId++;
          }

          const user_name = this.state.paiement.name_user;

          const user_id = DataRequest.get_id_user_from_name(user_name);

          const wallet_to_send = DataRequest.get_wallet_by_user_id(user_id);

          if(wallet_to_send == false)
          {
            error = "The user didn't have a wallet in his account !";
            this.setState({ deposit_error : error });
          }else
          {

            obj = {id_transfer : MaxUniqueId, 
             debited_wallet_id : actual_wallet.id_wallet,
             credited_wallet_id: wallet_to_send[0].id_wallet,
             amount : this.state.paiement.amount}

             actual_wallet.balance = actual_wallet.balance - obj.amount;

             wallet_to_send[0].balance = wallet_to_send[0].balance + obj.amount;

             DataRequest.update_wallet(wallet_to_send[0],AllWallet);

           }

         }


         if(error == "start")
         {

           Alldeposit.push(obj);

           localStorage.setItem(this.props.name,JSON.stringify(Alldeposit));

           DataRequest.update_wallet(actual_wallet,AllWallet);

           this.props.redirect();
         }

       }

     }
     render() {

      return (
        <div>

        <h2 className="title_monnaie">
        {this.props.name == "money_deposit" ? <p>Money Deposit</p> : null }
        {this.props.name == "money_transit" ? <p>Money Transit</p> : null }
        {this.props.name == "money_withdrawal" ? <p>Money Withdrawal</p> : null }
        </h2>

        <Row>

        <Col xs={4}>

        <Card style={{ height: '19rem' }}>
        <Card.Body>
        <Card.Title>

        {this.props.name == "money_deposit" ? <p>Deposit your currency</p> : null }
        {this.props.name == "money_transit" ? <p>Transit your currency</p> : null }
        {this.props.name == "money_withdrawal" ? <p>Withdrawal your currency</p> : null }

        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">

        {this.props.name == "money_deposit" ? <p>Get for me</p> : null }
        {this.props.name == "money_transit" ? <p>Send to any other</p> : null }
        {this.props.name == "money_withdrawal" ? <p>Send to someone</p> : null }

        </Card.Subtitle>
        <Card.Text>

        {this.props.name == "money_deposit" ? <p>Be careful not to find yourself in negative..</p> : null }
        {this.props.name == "money_transit" ? <p>Recover your money now..</p> : null }
        {this.props.name == "money_withdrawal" ? <p>Transfer money to your loved ones..</p> : null }

        </Card.Text>


        <Row>

        <Col xs={{ span: 10, offset: 1 }}>

        <Form.Control  
        type="text"
        name="amount"
        onChange={this.handledepositChange}
        required/>

        {this.props.name == "money_withdrawal" ? 


        <div>
        <br/>
        <Form.Control 
        as="select"
        name="name_user"
        onChange={this.handleUserName}>
        <option value="undefined">Select a user name...</option>
        {this.props.AllNameUsers[0].map(item => (
          <option key={item}>{item}</option>
          ))}
          </Form.Control>
          </div>


          : null }

          </Col>

          </Row>

          <br/>

          <Row>

          <Col xs={{ span: 6, offset: 3 }}>

          <Button type="submit" variant="success" disabled={!(this.state.deposit_error == "ready")} onClick={this.handleSubmit}>
          {this.props.name == "money_deposit" ? "SEND" : null }
          {this.props.name == "money_transit" ? "RECOVER" : null }
          {this.props.name == "money_withdrawal" ? "TRANSFER" : null }
          </Button>

          </Col>


          </Row>

          <div className="panel panel-default panel_error">
          <FormErrors formErrors={[this.state.deposit_error]} />
          </div>


          </Card.Body>
          </Card>

          </Col>

          { this.props.isExist != false ?

           this.props.isExist.map(item => (

             <Col xs={4}>

             <Card style={{ height: '16rem' }}>
             <Card.Body>
             <Card.Title>

             {this.props.name == "money_deposit" ? "ID Deposit : "+item.id_pay_out : null }
             {this.props.name == "money_transit" ? "ID Transit : "+item.id_pay_in : null }
             {this.props.name == "money_withdrawal" ? "ID Transfer : "+item.id_transfer : null }

             </Card.Title>
             <Card.Subtitle className="mb-2 text-muted">Personnal wallet ID : {this.props.wallet.id_wallet}</Card.Subtitle>
             <Card.Text>
             {this.props.name == "money_deposit" ? " + "+item.amount/100+" $" : null }
             {this.props.name == "money_transit" ? " - "+item.amount/100+" $" : null }
             {this.props.name == "money_withdrawal" ? "From [wallet ID : "+item.debited_wallet_id+"] [Name : "+DataRequest.get_user_name_from_wallet_id(item.debited_wallet_id)+"] has sent "+item.amount/100+" $ to [wallet ID : "+item.credited_wallet_id+"] [Name : "+DataRequest.get_user_name_from_wallet_id(item.credited_wallet_id)+"]" : null }
             </Card.Text>
             </Card.Body>
             </Card>

             </Col>

             )) : null }

           </Row>

           </div>


           )

}

}

export default Money_deposit;