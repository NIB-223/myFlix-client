import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';
import './profile.view.scss';

// import './profile-view.scss';

export class ProfileView extends React.Component {
constructor() {
    super();

    this.state = {
        Name: null,
        Username: null,
        Password: null,
        Email: null ,
        Birthdate: null,
        FavoriteMovies: [],
        validated: null,
    };
}

componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
        this.getUser(accessToken);
    }
}

getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://myflixdb20.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavouriteMovie(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios
      .delete(`https://myflixdb20.herokuapp.com/users/${username}/FavoriteMovies/${movie._id}`, 

      {
         headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
    // .then(() => window.location.reload());
  }

  handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirthdate) {
    e.preventDefault();
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://myflixdb20.herokuapp.com/users/${username}`, 
      {
        Name: newName ? newName : this.state.Name,
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        console.log(response)
        alert('Saved Changes');
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setName(input) {
    this.Name = input;
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthdate(input) {
    this.Birthdate = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://myflixdb20.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Row className="profile-view">
        <Card className="profile-card">
          <h2>Your Favorites Movies</h2>
          <Card.Body>
            {FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}

            <div className="favorites-movies ">
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                    return (
                      <CardDeck className="movie-card-deck">
                        <Card className="favorite-movie-card" style={{ width: '16rem' }} key={movie._id}>
                          <Card.Img style={{ width: '18rem' }} className="movieCard" variant="top" src={movie.ImagePath} />
                          <Card.Body>
                            <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                            <div className="fav-movie-btns">
                            <Button size='sm' className='remove-btn' variant='danger' value={movie._id} onClick={(e) => this.removeFavouriteMovie(movie)}>
                              Remove
                            </Button>
                            <Link to={`/movies/${movie._id}`}>
                            <Button size='sm' class="btn-primary movie-card" variant="primary">View Movie</Button>
                            </Link>                       
                            </div>
                          </Card.Body>
                        </Card>
                      </CardDeck>
                    );
                  }
                })}
            </div>
          </Card.Body>

          <h1 className="section">Change Account Information</h1>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Name, this.Username, this.Password, this.Email, this.Birthdate)}>

              <Form.Group controlId="formName">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control type="text" placeholder="Change Name" onChange={(e) => this.setName(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password<span className="required">*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthdate</Form.Label>
                <Form.Control type="date" placeholder="Change Birthdate" onChange={(e) => this.setBirthdate(e.target.value)} />
              </Form.Group>
                <div style={{textAlign: 'center'}}>
                    <Button className="update-btn" variant='danger' type="submit">
                    Update
                  </Button>
                </div>
               
     
              <Card.Body style={{textAlign: "right", marginTop: '4rem'}}>
                <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
                  Delete Account
                </Button>
              </Card.Body>
            </Form>

          </Card.Body>
        </Card>
      </Row >
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
  }),
};