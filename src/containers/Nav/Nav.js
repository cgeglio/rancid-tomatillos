import React, { Component } from 'react';
import './Nav.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions';
import { removeRatings } from '../../actions';

export class Nav extends Component {

  render() {
    return (
      <nav className='nav'>
        <div id='logo'></div>
        <h1 id='title'>LemonWire</h1>
        <h2 id='welcome-message'>{this.props.user.id ? `Welcome, ${this.props.user.name}!` : 'login to rate movies!'}</h2>
        <div id='user-avatar'></div>
        {this.props.user.id ? <button onClick={() => { this.props.logoutUser(this.props.user) && this.props.removeRatings(this.props.ratings)}} className='logout-button'>Logout</button> : <Link to="/login" className='login-button'>Login</Link>}
      </nav>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  logoutUser: user => dispatch(logoutUser(user)),
  removeRatings: ratings => dispatch(removeRatings(ratings))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
