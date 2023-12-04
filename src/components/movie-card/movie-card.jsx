export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div 
      onClick={() => {
        onMovieClick(movie);
      }}
    className="MovieCard" >
      <img src={movie.ImagePath} alt={movie.Title} className="MoviecardImage"/>
      <h2>{movie.Title}</h2>
      <h3>{movie.Rating}</h3>
    </div>
  );
};