  import React, { Component } from "react";
  import {Row,Col,Card} from 'react-bootstrap';
  import * as DataRequest from '../Data/data_request';

  class Menu extends React.Component {

    constructor(props)
    {
      super(props);

      this.state = {
       user_used : ""
     }

    }

    componentDidMount()
    {
      this.setState({user_used : DataRequest.get_current_user()});
    }

   render() {

    return (
      <div>
      <h2 className="title_used"> Menu </h2>

      <Row>

      <Col xs={{ span: 10, offset: 1 }}>

      <Card>
      <Card.Body>
      <Card.Title>{this.state.user_used.first_name_users+" "+this.state.user_used.last_name_users}</Card.Title>

      <Card.Subtitle className="mb-2 text-muted">User n° {this.state.user_used.id_users}</Card.Subtitle>
      <Card.Text>
      Email : <strong>{this.state.user_used.email_users}</strong>
      <br/>
      Is an admin : <strong>{this.state.user_used.is_admin_users ? "Yes" : "No"}</strong>
      <br/>
      
      </Card.Text>

      <Card.Link href={"/user/edit/"+this.state.user_used.id_users}>Update Information</Card.Link>

      </Card.Body>
      </Card>

      </Col>

      </Row>

      </div>)

    }

  }

  export default Menu;