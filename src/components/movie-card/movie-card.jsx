import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios';


import { Link } from "react-router-dom";

import './movie-card.scss'

export class MovieCard extends React.Component {

  addFavoriteMovie(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .post(`https://myflixdb20.herokuapp.com/users/${username}/FavoriteMovies/${movie._id}`, 
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie added to lists');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {

    const { movie } = this.props; 
    
    return (
      <Card className="cardClass">
        <div style={{textAlign: 'center'}}>
           <Card.Img  className="card-image" variant="top" src={movie.ImagePath} />
        </div>
       
        <Card.Body>
          <div className="card-text-body">
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Genre.Name}</Card.Text>
            <Card.Text className='card-description'>{movie.Description}</Card.Text>
             <Link to={`/movies/${movie._id}`}>
              <Button className="movieCard-btn" variant="primary">View Movie</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  FavoriteMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
    })
  ),
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired,
};