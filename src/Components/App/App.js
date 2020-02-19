import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
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
      <main id='main'>
        <Nav />
      </main>
    )
  }
}
export default App;

// {this.state.movies.length ?
// <MoviesContainer movies={this.state.movies}/>
// : <p>Error</p>
// }
