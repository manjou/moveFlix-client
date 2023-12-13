import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
// Here you import the PropTypes library
import PropTypes from "prop-types";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



export const MainView = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    console.log('token', token);
    
    if (!token) {
      return;
    }

    fetch("https://myflix-api-qeb7.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('movies', data);
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
  }, [token]);

  let similarMovies = selectedMovie ? movies.filter(movie => movie.Genre.Name === selectedMovie.Genre.Name) : [];


  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => {
             setUser(user);
             setToken(localStorage.getItem('token'));
          }} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
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
        <Col md={8}>
         <MovieView
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} 
          />
        </Col>
        
        <h2><hr></hr></h2>
        
        <h2>Similar Movies</h2>
          <>   
            {similarMovies.map((movie) => (
              <Col className="mb-4" key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                    }}  
                />
              </Col>
            ))}
          </>
        </>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-4" key={movie._id} md={4} xs={6}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
  }

  MainView.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired,
    setMovies: PropTypes.func.isRequired
  };




  // if (!user) {
  //   return (
  //     <>
  //       <LoginView onLoggedIn={(user, token) => {
  //       setUser(user);
  //       setToken(token);
  //       }}
  //       />
  //       or
  //       <SignupView />
  //     </>
  //   );
  // }



  // if (selectedMovie) {
  //   let similarMovies = movies.filter(movie => movie.Genre.Name === selectedMovie.Genre.Name);
  //   return (
  //     <>
  //       <button
  //         onClick={() => {
  //           setUser(null);
  //           setToken(null);
  //           localStorage.clear();
  //         }}
  //       >
  //         Logout
  //       </button>
  //       <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  //       <hr />
  //       <h2>Similar Movies</h2>
  //       <div className="MovieCardContainer">
  //         {similarMovies.map((movie) => {
  //           return (
  //             <MovieCard
  //               key={movie._id}
  //               movie={movie}
  //               onMovieClick={(newSelectedMovie) => {
  //                 setSelectedMovie(newSelectedMovie);
  //               }}  
  //             />   
  //           );
  //         })}
  //       </div>
    
  //     </>
  //   );
  // }

  // if (movies.length === 0) {
  //   return (
  //     <>
  //       <button 
  //         onClick={() => {
  //           setUser(null);
  //           setToken(null);
  //           localStorage.clear();
  //         }}
  //       >
  //         Logout
  //       </button>
  //       <div>The list is empty!</div>;
  //     </>
  //   )
  // }

  // return (
    
  //   <div className="MovieCardContainer">
  //     <button
  //       onClick={() => {
  //         setUser(null);
  //         setToken(null);
  //         localStorage.clear();
  //       }}
  //     >
  //       Logout
  //     </button>
  //     {movies.map((movie) => (
  //       <MovieCard
  //         key={movie._id}
  //         movie={movie}
  //         onMovieClick={(newSelectedMovie) => {
  //           setSelectedMovie(newSelectedMovie);
  //         }}
  //       />
  //     ))}
  //   </div>