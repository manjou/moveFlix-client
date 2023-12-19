import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import axios from 'axios';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import "./main-view.scss";
import { Row, Col, Form, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  // const [user, setUser] = useState(localStorage.getItem("user"));
  // const [token, setToken] = useState(localStorage.getItem("token"));  

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true); // adding state for loading


  useEffect(() => {
    
    if (!token) {
      return;
    }

    fetch("https://myflix-api-qeb7.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
         return {
            _id: doc._id,
            Title: doc.Title,
            Description: doc.Description,
            ImagePath: doc.ImagePath,
            Rating: doc.Rating,
            Director: {
              Name: doc.Director.Name
            },
            Genre: {
              Name: doc.Genre.Name,
            },
            Release: doc.Release,
            Actors: doc.Actors
          };
        }, [token]);
  
        setMovies(moviesFromApi);
        setLoading(false); // set Loading on false, when data received
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  // let similarMovies = selectedMovie ? movies.filter(movie => movie.Genre.Name === selectedMovie.Genre.Name) : [];


  // Toggle Favorite Movie
const toggleFav = (id) => {
  const userId = user._id;

  //check if the movie ID exists in the movies state
  const movieExists = movies.some(movie => movie._id === id);
  if (!movieExists) {
    return;
  }
  if (user.FavoriteMovies.includes(id)) {

    axios.delete(`https://myflix-api-qeb7.onrender.com/users/${user._id}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;
      setUser(data);
    })
    .catch(e => {
      console.log('error removing the movie from favorites')
      console.log(e);
    });
  } else {
    console.log('Checking if movie is not in favorites');
    if (!user.FavoriteMovies.includes(id)){
      axios.post(`https://myflix-api-qeb7.onrender.com/users/${user._id}/movies/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;
      setUser(data);
    })
    .catch(e => {
      console.log('error adding the movie to favorites')
      console.log(e.response.data);
    });
  }
    }

};

// Add Favorite Movie
const addFav = (id) => {
  axios.post(`https://myflix-api-qeb7.onrender.com/users/${user._id}/movies/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  })
  .catch(error => {
    console.error('Error: ', error.response.data);
    alert("Failed to add");
  });
};




// Remove Favorite Movie

const removeFav = (id) => {
  axios.delete(`https://myflix-api-qeb7.onrender.com/users/${user._id}/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  })
  .catch(error => {
    console.error('Error: ', error)
  });
};


// Routes Definition
  return (
    <BrowserRouter>
    <NavigationBar 
      user={user}
      onLoggedOut={() => {
        setUser(null)
        setToken(null)
        localStorage.clear()
      }} 
    className="mb-5"
    search={search}
    setSearch={setSearch}
    selectedGenre={selectedGenre}
    setSelectedGenre={setSelectedGenre}
    />
      <Row className="justify-content-md-center">
        <Routes>
          {/* Return SignupView if not logged in, otherwise home */}
          <Route
            path="/signup"
            element={user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )
            }
          />
          {/* Return LoginView if not logged in, otherwise home */}
          <Route
            path="/login"
            element={user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )
            }
          />
          {/* Return MovieView if logged in, otherwise LoginView */}
          <Route
            path="/movies/:movieId"
            element={!user ? (
                  <Navigate to="/login" replace />
                ) : loading ? ( // when loading true,show spinner
                  <Spinner animation="border" role="status">
                    <span className="sr-only">...</span>
                  </Spinner>
                ) : (
                  <Col md={12}>
                    <MovieView
                      movies={movies}
                      addFav={addFav}
                      removeFav={removeFav} 
                    />
                  </Col>
                )
            }
          />
          {/* Return MovieCards if logged in, otherwise LoginView */}
          <Route
            path="/"
            element={!user ? (
                  <Navigate to="/login" replace />
                ) : loading ? ( // Wenn loading true ist, zeigen Sie den Spinner an
                <Spinner animation="border" role="status">
                  <span className="sr-only">...</span>
                </Spinner>
                ) : movies.length === 0 ? (
                  <Col>
                    The list is empty!
                  </Col>
                ) : (
                  movies.filter((movie) => {
                      return selectedGenre === ""
                      ? movie
                      : movie.Genre && movie.Genre.Name === selectedGenre;
                    })
                    .filter((movie) => {
                      return search === ""
                      ? movie
                      : movie.Title.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((movie, movieId) => (
                      <Col className="mb-3" key={movie.id}  xs={12} md={6} lg={3} xl={2}>
                        <MovieCard 
                          movie={movie}
                          toggleFav={toggleFav}
                          isFavorite={user && user.FavoriteMovies ? user.FavoriteMovies.includes(movie._id) : false}
                        />
                      </Col>
                    ))
                )
            }
          />
          {/* Return ProfileView if logged in, otherwise LoginView */}
          <Route
            path="/profile"
            element={!user ? (
                  <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <ProfileView
                        user={user}
                        movies={movies}
                        toggleFav={toggleFav}
                        removeFav={removeFav}
                        addFav={addFav}
                        setUser={setUser}
                      />
                    </Col>
                  )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
    
    

    // old code before routing.  left it to check for similar movies to be implementing
  //     {!user ? (
  //       <Col md={5}>
  //         <LoginView onLoggedIn={(user) => {
  //            setUser(user);
  //            setToken(localStorage.getItem('token'));
  //         }} />
  //         or
  //         <SignupView />
  //       </Col>
  //     ) : selectedMovie ? (
  //       <>
  //       <Col md={2}>
  //         <Button
  //           onClick={() => {
  //             setUser(null);
  //             setToken(null);
  //             localStorage.clear();
  //           }}
  //           variant="dark"
  //         >
  //           Logout
  //         </Button>
  //       </Col>
       
  //       <Col md={8}>
  //        <MovieView
  //           movie={selectedMovie} 
  //           onBackClick={() => setSelectedMovie(null)} 
  //         />
  //       </Col>
        
  //       <h2><hr></hr></h2>
        
  //       <h2>Similar Movies</h2>
  //         <>   
  //           {similarMovies.map((movie) => (
  //             <Col className="mb-4" key={movie._id} md={3}>
  //               <MovieCard
  //                 movie={movie}
  //                 onMovieClick={(newSelectedMovie) => {
  //                   setSelectedMovie(newSelectedMovie);
  //                   }}  
  //               />
  //             </Col>
  //           ))}
  //         </>
  //       </>
  //     ) : movies.length === 0 ? (
  //       <div>The list is empty!</div>
  //     ) : (
  //       <>
  //         {movies.map((movie) => (
  //           <Col className="mb-4" key={movie._id} md={4} xs={6}>
  //             <MovieCard
  //               movie={movie}
  //               onMovieClick={(newSelectedMovie) => {
  //               setSelectedMovie(newSelectedMovie);
  //               }}
  //             />
  //           </Col>
  //         ))}
  //       </>
  //     )}
  //   </Row>
  // );
  // }






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