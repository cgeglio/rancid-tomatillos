import React, { Component } from 'react';
import './LoginForm.css';

class LoginForm extends Component {
  constructor() {
    super();
    this.state= {email: '', password: ''}
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Email..."
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Password..."
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button className='login-btn'>Login</button>
      </form>
    )
  }
}

export default LoginForm
