import React, { Component } from 'react';
import './Nav.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions';
import { removeRatings } from '../../actions';

class Nav extends Component {

  render() {
    return (
      <nav className='nav'>
        <div id='logo'></div>
        <h1 id='title'>LemonWire</h1>
        <h2 id='welcome-message'>🍋 Welcome {this.props.user ? this.props.user.name : ''}! 🍋</h2>
        <div id='user-avatar'></div>
        {this.props.user.id ? <button onClick={() => { this.props.logoutUser(this.props.user) && this.props.removeRatings(this.props.ratings)}} className='logout-button'>Logout</button> : <Link to="/login" className='login-button'>Login</Link>}
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  logoutUser: user => dispatch(logoutUser(user)),
  removeRatings: ratings => dispatch(removeRatings(ratings))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
