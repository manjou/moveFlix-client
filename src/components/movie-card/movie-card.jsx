import "./movie-card.scss";
import React from "react";
// Here you import the PropTypes library
import PropTypes from "prop-types";

import { Button, Card, CardBody, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, toggleFav, addFav, isFavorite }) => {
  return (
    <Card className="h-100" id="Movie-Card">
      <div>
        <Card.Img variant="top" src={movie.ImagePath}  alt={`Image of ${movie.Title}`} className="MoviecardImage"/>
        <div>
          {isFavorite ? (
            <BookmarkHeartFill size={40} color="red" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => toggleFav(movie._id)}/>
            ) : (
            <BookmarkHeart size={40} color="red" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => toggleFav(movie._id)}/>
          )}
        </div>
      </div>
      
      <Card.Body id="Movie-Card-Info">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Rating}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="dark" >Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  toggleFav: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

MovieCard.defaultProps = {
  movie: {
    _id: "",
    title: ""
  }
}