import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Route } from 'react-router-dom';
import axios from 'axios';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import "./main-view.scss";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log('storedUser:', storedUser);
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  // const [user, setUser] = useState(localStorage.getItem("user"));
  // const [token, setToken] = useState(localStorage.getItem("token"));  
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false); // adding state for loading
  

  useEffect(() => {
    
    if (!token) {
      return;
    }
    setLoading(true);
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
              Name: doc.Director.Name,
              Bio: doc.Director.Bio,
              Birth: doc.Director.Birth
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
                    <span className="sr-only"></span>
                  </Spinner>
                ) : (
                  <Col md={12}>
                    <MovieView
                      movies={movies}
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
                  <span className="sr-only"></span>
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
                    .map((movie, movieId) => {
                      console.log(movie);
                      return (
                      <Col className="mb-2" key={movie._id}  xs={12} sm={6} md={4} lg={3} xl={2}>
                        <MovieCard 
                          user={user}
                          setUser={setUser}
                          movie={movie}
                          movies={movies}
                          isFavorite={user && user.FavoriteMovies ? user.FavoriteMovies.includes(movie._id) : false}
                        />
                      </Col>
                    );
                })
            )}
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
    
  