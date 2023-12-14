import "./movie-card.scss";
import React from "react";
// Here you import the PropTypes library
import PropTypes from "prop-types";

import { Button, Card, CardBody, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" id="Movie-Card">
      <Card.Img variant="top" src={movie.ImagePath}  alt={`Image of ${movie.Title}`} className="MoviecardImage"/>
      <Card.Body id="Movie-Card-Info">
        <Card.Text>{movie.Title}</Card.Text>
        <Card.Text>{movie.Rating}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="dark" >Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};