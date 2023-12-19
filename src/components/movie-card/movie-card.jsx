import "./movie-card.scss";
import React from "react";
// Here you import the PropTypes library
import PropTypes from "prop-types";

import { Button, Card, CardBody, CardImg, Figure, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, toggleFav, addFav, isFavorite }) => {
  return (
    <Card className="MovieCard">
      <Card.Body>
          <Figure>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Figure.Image
                variant="top" 
                src={movie.ImagePath}  
                alt={`Image of ${movie.Title}`} 
              />
              <Figure.Caption>
                {movie.Title}
              </Figure.Caption>
              <Figure.Caption>
                {movie.Rating}
              </Figure.Caption>
            </Link>
          </Figure>
            <div>
              {isFavorite ? (
                <BookmarkHeartFill size={40} color="red" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => toggleFav(movie._id)}/>
                ) : (
                <BookmarkHeart size={40} color="red" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => toggleFav(movie._id)}/>
              )}
            </div>
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