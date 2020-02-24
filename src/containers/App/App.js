import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import LoginForm from '../../containers/LoginForm/LoginForm'
import Nav from '../Nav/Nav';
import MovieDetails from '../MovieDetails/MovieDetails';
import Loading from '../../Components/Loading/Loading';
import './App.css';
import { connect } from 'react-redux'


export class App extends Component {
  render() {
    return(
       <main>
       <Switch>
         <Route exact path='/'>
           <Nav />
           <MoviesContainer />
         </Route>
         <Route path='/movies/:id'>
            {!this.props.user.id ? <Redirect to="/" /> : (
            <>
             <Nav />
             <MovieDetails />
            </>
           )}
         </Route>
         <Route exact path='/login'>
           {this.props.user.id ? <Redirect to='/' /> :
             <section className='login-page'>
               <h2 className='login-msg'>Get your ratings on.</h2>
               <img src={process.env.PUBLIC_URL + '/clapper.png'} alt='Clapperboard icon' className='clapper' />
               <LoginForm />
             </section>
           }
         </Route>
         <Redirect to='/' />
       </Switch>
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  movies: state.movies
})

export default connect(mapStateToProps)(App);
