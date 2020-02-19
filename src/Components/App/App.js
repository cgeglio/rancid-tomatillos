import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import LoginForm from '../LoginForm/LoginForm'
import Nav from '../Nav/Nav';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => this.setState({movies: movies.movies}))
      .catch(error => console.log(error))
  }

  render() {
    return(
       <main>
        <Route exact path="/">
          <Nav />
          {this.state.movies.length ?
          <MoviesContainer movies={this.state.movies}/>
          : <p>Error</p>
          }
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
