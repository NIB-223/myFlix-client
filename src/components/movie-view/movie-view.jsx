import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


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
      // <div className="movie-view">
      //   <div className="movie-poster">
      //     <img src={movie.ImagePath} />
      //   </div>
      //   <div className="movie-title">
      //     <span className="label">Title: </span>
      //     <span className="value">{movie.Title}</span>
      //   </div>
      //   <div className="movie-description">
      //     <span className="label">Description: </span>
      //     <span className="value">{movie.Description}</span>
      //   </div>
      //   {/* <div className="movie-actors">
      //   <span className="label">Actors: </span>
      //     <span className="value">{movie.Actors.Name}</span>
      //   </div> */}
      //   <div className="movie-genre">
      //     <span className="label">Genre: </span>
      //     <span className="value">{movie.Genre.Name}</span>
      //   </div>
      //   <div className="movie-director">
      //     <span className="label">Director: </span>
      //     <span className="value">{movie.Director.Name}</span>
      //   </div>
        
      //   <button onClick={() => { onBackClick(null); }}>Back</button>
      //  </div>

<Card>
<Card.Img variant="top" src={movie.ImagePath} />
<Card.Body>
  <Card.Title>{movie.Title}</Card.Title>
  <Card.Text>{movie.Description}</Card.Text>
  <Card.Text>Genre:  {movie.Genre.Name}</Card.Text>
  <Card.Text>Directed by: {movie.Director.Name}</Card.Text>
  <Card.Text>Starring: {movie.Actors}</Card.Text>
  <Button onClick={() => onBackClick(null)} variant="primary">Back</Button>
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
    Actors: PropTypes.array,
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