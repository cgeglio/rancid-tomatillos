import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import LoginForm from '../../containers/LoginForm/LoginForm'
import Nav from '../Nav/Nav';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  render() {
    return(
       <main>
        <Route exact path="/">
          <Nav />
          <MoviesContainer />
        </Route>
        <Route exact path="/login">
          <section className="login-page">
            <h2 className='login-msg'>Get your ratings on.</h2>
            <img src={process.env.PUBLIC_URL + '/images/clapper.png'} alt="Clapperboard icon" className="clapper" />
            <LoginForm />
          </section>
        </Route>
      </main>
    )
  }
}

export default App;
