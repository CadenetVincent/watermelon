  import React, { Component } from "react";
  import {Row,Col,Card,Form,Button} from 'react-bootstrap';
  import * as DataRequest from '../Data/data_request';

  class Create_Wallet extends React.Component {

    constructor(props)
    {
      super(props);

      this.state = {
        actual_user : "",
        balance : 0,
        balance_error : ""
    };
    }

    componentDidMount()
    {
     this.setState({ actual_user : DataRequest.get_current_user()})
    }

    handleBalanceChange()
    {

    }

    render() {

      return (
        <div>

        <Card style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Title>Create a wallet</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
        This wallet will be attributed to : <strong> {this.state.actual_user.first_name_users} {this.state.actual_user.last_name_users}</strong>
        </Card.Subtitle>
        <Card.Text>
        Please enter the amount :
        </Card.Text>

        <Form onSubmit={this.handleSubmit}>

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

        <Col xs={{ span: 6, offset: 3 }} center>

          <Button type="submit" variant="success">Validate</Button>

        </Col>

        </Row>


        </Form>

        </Card.Body>
        </Card>

        </div>)

    }

  }

  export default Create_Wallet;