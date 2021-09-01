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
  <div style={{textAlign: "center"}}>
  <Button onClick={() => onBackClick(null)} className="back-btn" variant="primary">Back</Button>
  </div>
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