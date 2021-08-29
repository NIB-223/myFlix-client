import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBar } from '../navbar-view/navbar-view';

import './main-view.scss';
import logo from '../../../img/logo.jpg';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null
    };
  }

getMovies(token) {
  axios.get('https://myflixdb20.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    this.props.setMovies(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

   /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}
//logs user out
onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}

  SignUp(register) {
    this.setState({
      register
    });
  }


render() {
  let { movies } = this.props;
  let { user } = this.state;

  return (
    <>
     <main>
    {/* <button onClick={() => { this.onLoggedOut() }}>Logout</button> */}
    <Router>
    { user && <NavBar user={user}/>}
      <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
          if (movies.length === 0) return <div className="main-view" />;

          return <MoviesList movies={movies}/>;
          // return movies.map(m => (
          //   <Col md={3} key={m._id}>
          //     <MovieCard movie={m} />
          //   </Col>
          // ))
        }} />
        <Route path="/register" render={() => {
           if (user) return <Redirect to="/" />
            return <Col>
          <RegistrationView />
          </Col>
        }} />

<Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

<Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

<Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

<Route path="/users/:Username" render={({ history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
          
             return (
              <>
                <Row className="m-3 navigation-main">
                
                </Row>
                <Row>
                  <Col>
                    <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                  </Col>
                </Row>
              </>
            )
          }
          } />
      </Row>
    </Router>
    </main>
   </>     
  );
}
}
let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);
