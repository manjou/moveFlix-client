export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="MovieView">
      <div>
        <img src={movie.ImagePath} alt="{movie.Title}" className="MovieViewImage" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <br /><span>Name: </span>
        <span>{movie.Director.Name}</span>
        <br /><span>Bio: </span>
        <span>{movie.Director.Bio}</span>
        <br /><span>Birth: </span>
        <span>{movie.Director.Birth}</span>
      </div>
      <div>
        <span>Genre:</span>
        <br /><span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Release: </span>
        <span>{movie.Release}</span>  
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};