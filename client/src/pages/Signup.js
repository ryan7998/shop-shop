import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { Form, Button, Grid, Header, Icon, Image, Message, Segment, TextArea } from 'semantic-ui-react'


function Signup() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser, {error}] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try{

    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        firstName: formState.firstName, lastName: formState.lastName
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  }catch(e){
    console.log(e);
  }

  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (

  <div >
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='olive' textAlign='center'>Sign up</Header>
      <Form size='large' onSubmit={handleFormSubmit}>
      <Segment stacked>
        <Form.Group widths='equal'>
          <Form.Input required fluid placeholder='First name' name="firstName" onChange={handleChange} />
          <Form.Input required fluid placeholder='Last name' name="lastName" onChange={handleChange} />
        </Form.Group>
          <Form.Input required fluid placeholder='Email' name="email" onChange={handleChange} />
          <Form.Input type='password' required fluid placeholder='Password' name="password" onChange={handleChange} />
        <Form.Checkbox required label='I agree to the Terms and Conditions' />
        </Segment>
        
        <Button color='olive' fluid size='large'>
          Sign up
        </Button>
        {error && <Message color='red'>Registration Failed! Please try again</Message>}

      </Form>
    </Grid.Column>
  </Grid>
  </div>
  );

}

export default Signup;
