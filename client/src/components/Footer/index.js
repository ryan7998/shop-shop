import React from 'react';
// import { Link } from "react-router-dom";
import {Segment, Grid, List, Container, Header} from 'semantic-ui-react';

const Footer = () =>{
    return(
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item icon="github" 
                     content={<a href='https://github.com/ryan7998'>GitHub</a>}>
               </List.Item>
                <List.Item
                    icon='mail'
                    content={<a href='mailto:mail@fazleryan.com'>mail@fazleryan.com</a>}
                />
                <List.Item
                    icon='user'
                    content={<a href='https://fazleryan.com'>fazleryan.com</a>}
                />
                {/* <List.Item as='a'>Religious Ceremonies</List.Item> */}
                {/* <List.Item as='a'>Gazebo Plans</List.Item> */}
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item icon="github" 
                     content={<a href='https://github.com/ryan7998/shop-shop'>Source Code</a>}>
               </List.Item>
                <List.Item icon="linkedin" 
                     content={<a href='https://www.linkedin.com/in/fazle-ryan/'>LinkedIn</a>}>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                SHOP SHOP
              </Header>
            <p> Developed By Fazle Ryan Chowdhury</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
    )
}

export default Footer;