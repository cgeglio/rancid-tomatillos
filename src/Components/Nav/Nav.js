import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  constructor() {
    super();
    this.state = []
  }

  render() {
    return (
      <nav className='nav'>
        <div id='logo'></div>
        <h1 id='title'>LemonWire</h1>
        <h2 id='welcome-message'>🍋 Welcome, Mike Tyson! 🍋</h2>
        <div id='user-avatar'></div>
        <button id='logout-button'>logout</button>
      </nav>
    )
  }
}

export default Nav;
// <h3 id='email'>DatsWathup@thavage.com</h3>
