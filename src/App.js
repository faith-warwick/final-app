import React, { Component } from 'react';
import { Navbar, Button, ButtonToolbar, Nav } from 'react-bootstrap';
import Landing from './Home/Landing';
import ProfilePage from './Home/profile';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">PurrfectHealth</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
                  <ButtonToolbar>
                      <Button
                        className="btn-margin"
                        onClick={this.goTo.bind(this, 'home')}
                      >
                        Home
                      </Button>
                      {
                        !isAuthenticated() && (
                            <Button
                              id="qsLoginBtn"
                              onClick={this.login.bind(this)}
                            >
                              Log In
                            </Button>
                          )
                      }
                      {
                        isAuthenticated() && (
                            <Button
                              id="qsLogoutBtn"
                              onClick={this.logout.bind(this)}
                            >
                              Log Out
                            </Button>
                          )
                      }
                </ButtonToolbar>
          </Nav>
        </Navbar>
          {!isAuthenticated() && (
              <Landing />
          )}
      </div>
    );
  }
}

export default App;
