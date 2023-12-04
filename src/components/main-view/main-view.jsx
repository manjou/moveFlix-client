import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";



export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflix-api-qeb7.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const moviesFromApi = data.map((doc) => {
          console.log(data); // Log the document data
  
          return {
            Title: doc.Title,
            Description: doc.Description,
            ImagePath: doc.ImagePath,
            Rating: doc.Rating,
            Director: doc.Director,
            Genre: doc.Genre,
            Release: doc.Release,
            Actors: doc.Actors
          };
        });
  
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div className="MovieCardContainer">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};