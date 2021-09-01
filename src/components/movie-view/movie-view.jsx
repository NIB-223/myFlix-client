import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-view.scss'


export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;  //props

    return (
<Card>
<Card.Img variant="top" src={movie.ImagePath} />
<Card.Body>
  <Card.Title>{movie.Title}</Card.Title>
  <Card.Text>{movie.Description}</Card.Text>
  <Card.Text>Genre:  {movie.Genre.Name}</Card.Text>
  <Card.Text>Directed by: {movie.Director.Name}</Card.Text>
  <Card.Text>Starring: {movie.Actors}</Card.Text>
<div className="btn-container">
  <div className="details-btn-flex">
    <Link to={`/directors/${movie.Director.Name}`}>
        <Button variant="link">Director Info</Button>
    </Link>

    <Link to={`/genres/${movie.Genre.Name}`}>
      <Button variant="link">Genre Info</Button>
    </Link>
  </div>
    <div style={{textAlign: "center"}}>
      <Button className="back-btn" onClick={() => onBackClick(null)} variant="primary">Back</Button>
    </div>
      
</div>

</Card.Body>
</Card>
       
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Actors: PropTypes.array.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};