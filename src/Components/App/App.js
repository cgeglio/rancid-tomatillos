import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import LoginForm from '../../containers/LoginForm/LoginForm'
import Nav from '../Nav/Nav';
import './App.css';
import { connect } from 'react-redux'


export class App extends Component {

  render() {
    return(
       <main>
        <Route exact path="/">
          <Nav />
          <MoviesContainer />
        </Route>
        <Route exact path="/login">
          {this.props.user.id ? <Redirect to="/" /> :
            <section className="login-page">
              <h2 className='login-msg'>Get your ratings on.</h2>
              <img src={process.env.PUBLIC_URL + '/clapper.png'} alt="Clapperboard icon" className="clapper" />
              <LoginForm />
            </section>
          }
        </Route>
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  movies: state.movies
})

export default connect(mapStateToProps)(App);
