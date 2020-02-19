import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  constructor() {
    super();
    this.state = []
  }

  render() {
    return (
      <nav id='nav'>
        <h1 id='title'>LemonWire</h1>
        <div id='logo'></div>
        <div id='greeting'>
          <h2>Welcome, Mike Tyson!</h2>
          <h3>DatsWathup@thavage.com</h3>
        </div>
        <div id='user-avatar'></div>
        <button id='logout-button'>logout</button>
      </nav>
    )
  }
}

export default Nav;
