import React, { Component } from 'react';
import './LoginForm.css';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';

class LoginForm extends Component {
  constructor() {
    super();
    this.state= {email: '', password: '', error: false}
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  verifyInputs = event => {
    event.preventDefault();
    let values = Object.values(this.state);
    values.includes('') ? this.setState({error: true}) : this.completeLogin();
  }

  completeLogin = () => {
    let user = {email: this.state.email, password: this.state.password};
    this.fetchUserInfo(user);
    this.setState({email: '', password: '', error: false});
  }

  fetchUserInfo = user => {
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch('https://rancid-tomatillos.herokuapp.com/api/v1/login', options)
      .then(response => response.json())
      .then(userInfo => this.props.addUser(userInfo.user))
      .catch(error => console.log('Error posting'))
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
        <button className='login-btn' onClick={this.verifyInputs}>Login</button>
        {this.state.error ? <h2 className='error-msg'>Please enter a valid email and password!</h2> : null}
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(updateUser(user))
})

export default connect(null, mapDispatchToProps)(LoginForm)
