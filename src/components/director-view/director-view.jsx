import React from 'react';
import PropTypes from 'prop-types';

import { Button, Row, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './director-view.scss';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick, movies } = this.props

        // const directorMovies = movies.filter(m => m.director.name === director.name);

        return (
<Card>
<Card.Body>
  <Card.Title>{director.Name}</Card.Title>
  <Card.Text>Born: {director.Birth}</Card.Text>
  <Card.Text>Bio:  {director.Bio}</Card.Text>
  {/* <Card.Text>Other Movies:  {directorMovies.map((m, i) => <Link to={`/movies/${m.Title}`} key={i}>{m.Title}</Link>)}</Card.Text> */}
  <Button onClick={() => onBackClick(null)} variant="primary">Back</Button>
</Card.Body>
</Card>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
    }),
    onBackClick: PropTypes.func.isRequired
};