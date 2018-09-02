import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Kevin from './kevin';
import Garbo from './garbo';
import Tony from './tony';


class Footer extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render(){
    const { anchorEl } = this.state;
    return (
      <div className="footer">
        <div className="socialLinks">
          <Kevin/>
          <Garbo/>
          <Tony/>
        </div>

        <div className="projectLinks">
          <br/>
          <br/>
          <a className="socials" href="https://github.com/capoxix/intro-mongo">
            <i className="fab fa-github"></i>
          </a>
        </div>


      </div>
    );
  }
}

export default Footer;
