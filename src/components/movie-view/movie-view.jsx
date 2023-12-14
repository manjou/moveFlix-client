import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';
import Button from "react-bootstrap/Button";

// Here you import the PropTypes library
import PropTypes from "prop-types";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  if (!movie) {
    return <div>Loading...</div>
  }
  return (
    <div className="row px-10 MovieView">
      <div className="col-md-7">
        <img src={movie.ImagePath} alt="{movie.Title}" className="MovieViewImage w-100" />
      </div>
      <div className="col-md-5 MovieView">
        <ul className="list-group mb-4">
          <li className="list-group-item">
            <span>{movie.Title}</span>
          </li>
          <li className="list-group-item">
            <span>{movie.Description}</span>
          </li>
          <li className="list-group-item">
            <span>Director: </span>
            <br />
            <span>{movie.Director.Name}</span>
            <br /><span>Bio: </span>
            <span>{movie.Director.Bio}</span>
            <br /><span>Birth: </span>
            <span>{movie.Director.Birth}</span>
          </li>
          <li className="list-group-item">
            <span>Genre:</span>
            <br /><span>{movie.Genre.Name}</span>
          </li>
          <li className="list-group-item">
            <span>Release: </span>
            <span>{movie.Release}</span>  
          </li>
          <li className="list-group-item">
            <span>Actors: </span>
            <br />
            <span>{movie.Actors.join(", ")}</span>
          </li>
        </ul>
        <Link to={`/`}>
          <Button variant='dark'>Back</Button>
        </Link>
        
    </div>
  </div>
    
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      GenreName: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      DirectorName: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};