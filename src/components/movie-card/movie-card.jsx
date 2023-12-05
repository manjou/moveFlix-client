// Here you import the PropTypes library
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div 
      onClick={() => {
        onMovieClick(movie);
      }}
    className="MovieCard" >
      <img src={movie.ImagePath} alt={movie.Title} className="MoviecardImage"/>
      <div className="MovieCardInfo ">
        <h2>{movie.Title}</h2>
        <h3>{movie.Rating}</h3>
      </div>
 
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};