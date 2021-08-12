import React from 'react';
import PropTypes from 'prop-types';

import { Button, Row, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './genre-view.scss';

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick, movies } = this.props

        return (
            <Card>
<Card.Body>
  <Card.Title>{genre.Name}</Card.Title>
  <Card.Text>Definition: {genre.Description}</Card.Text>
  {/* <Card.Text>Other Movies:  {directorMovies.map((m, i) => <Link to={`/movies/${m.Title}`} key={i}>{m.Title}</Link>)}</Card.Text> */}
  <Button onClick={() => onBackClick(null)} variant="primary">Back</Button>
</Card.Body>
</Card>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }),
    onBackClick: PropTypes.func.isRequired
};