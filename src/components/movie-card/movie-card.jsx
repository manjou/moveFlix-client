import "./movie-card.scss";

// Here you import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card, CardBody, CardImg } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card onClick={() => {
      onMovieClick(movie);
    }}
    className="h-100" id="Movie-Card">
      <Card.Img variant="top" src={movie.ImagePath}  alt={`Image of ${movie.Title}`} className="MoviecardImage"/>
      <Card.Body id="Movie-Card-Info">
        <Card.Text>{movie.Title}</Card.Text>
        <Card.Text>{movie.Rating}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};