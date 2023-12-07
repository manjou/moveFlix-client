import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
// Here you import the PropTypes library
import PropTypes from "prop-types";
import { SignupView } from "../signup-view/signup-view";



export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-api-qeb7.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
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
        }, [token]);
  
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
        }}
        />
        or
        <SignupView />
      </>
    );
  }



  if (selectedMovie) {
    let similarMovies = movies.filter(movie => movie.Genre.Name === selectedMovie.Genre.Name);
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <hr />
        <h2>Similar Movies</h2>
        <div className="MovieCardContainer">
          {similarMovies.map((movie) => {
            return (
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}  
              />   
            );
          })}
        </div>
    
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button 
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <div>The list is empty!</div>;
      </>
    )
  }

  return (
    
    <div className="MovieCardContainer">
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
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

MainView.prototype = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  setMovies: PropTypes.func.isRequired
};