import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Menu, Segment, Icon } from 'semantic-ui-react';

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Link to="/orderHistory">
            <Menu.Item
              name='Order History'
            />
          </Link>
            <Menu.Item
              name='Log Out'
              onClick={() => Auth.logout()}
            />
        </>
      );
    } else {
      return (
        <>
          <Link to="/signup">
            <Menu.Item
              name='Signup'
            />
          </Link>
          <Link to="/login">
            <Menu.Item
              name='Login'
            />
          </Link>
        </>
      );
    }
  }

  return (

      <Segment inverted>
        <Menu inverted fixed>
            <Icon.Group size='huge'>
            <Link to="/">
              <Icon color='yellow' name='shopping basket' />
            </Link>
            </Icon.Group>
            <Menu.Menu position='left' style={{margin:'20px'}}>
              {showNavigation()}
          </Menu.Menu>
        </Menu>
      </Segment>
  );
}

export default Nav;
