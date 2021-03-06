import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Route, Redirect, Switch, Link, HashRouter, withRouter} from 'react-router-dom';
import Help from './help';
import About from './about';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import '../../styling/header/header.css';
import '../../index.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: lightBlue[900] }, // Purple and green play nicely together.
    // secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

class ButtonAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      time: 15
    };
  }

  componentWillMount(){
    this.props.removeErrors();
  }

  render(){
    // console.log(this.props);
    if (!this.props.currentUser.id){
      return (
        <div className="appbar">
          <MuiThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <div className="leftNavBar">
                  <Typography variant="title" color="inherit">
                    <Link className="navBarLink" to={"/map"} onClick={()=>this.props.removeErrors()}>Roamy</Link>
                  </Typography>

                  </div>

                  <div className="rightNavBar">
                    <Help/>
                  <Typography variant="title" color="inherit">
                    <Link className="navBarLink" to={"/signup"}  onClick={()=>this.props.removeErrors()}>Sign Up</Link>
                  </Typography>
                  <Typography variant="title" color="inherit">
                    <Link className="navBarLink" to={"/login"} onClick={()=>this.props.removeErrors()}>Log In</Link>
                  </Typography>

                  <Typography variant="title" color="inherit">
                    <Link className="navBarLink" to={"/map"} onClick={()=>this.props.login({email:'garbocheng93@gmail.com', password: '123456'})}>Demo Login</Link>
                  </Typography>
                </div>
                  </Toolbar>
                </AppBar>
              </MuiThemeProvider>
            </div>
          )}else{
            return (
              <div className="appbar">
                <MuiThemeProvider theme={theme}>
                  <AppBar position="static" color="primary">
                    <Toolbar>
                      <div className="leftNavBar">
                      <Typography variant="title" color="inherit">
                        <Link className="navBarLink" to={"/"}>Roamy</Link>
                      </Typography>


                      </div>

                      <div className="rightNavBar">
                        <Help/>
                      <div className="greeting">
                        Hello {this.props.name}!
                      </div>
                      <Link className="logout_button" to="/" onClick={()=> this.props.logout()}>Log Out</Link>
                      </div>
                    </Toolbar>
                  </AppBar>
                </MuiThemeProvider>
              </div>
            )
          }
        }
      };

      export default ButtonAppBar;
