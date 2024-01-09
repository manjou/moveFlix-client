import React, { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap";
import "../movie-card/movie-card.scss";
import { MovieCard } from '../movie-card/movie-card';

function FavoriteMovies({ favoriteMovieList, toggleFav, user, setUser, movies }) {
  const [favorites, setFavorites] = useState(favoriteMovieList);

  useEffect(() => {
    setFavorites(favoriteMovieList);
  }, [user, favoriteMovieList]);
  return (
    <Row>
      <Col xs={12}>
       <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2> 
      </Col>
    <Row className="justify-content-center">
        {
        favorites?.length !== 0 ?
        favorites?.map((movie) => (
            <Col  xs={12} sm={6} md={4} lg={3} xl={2} className="mx-1 mt-2 mb-2" key={movie._id}>
                <MovieCard
                    user={user}
                    setUser={setUser}
                    movie={movie}
                    movies={movies}
                    isFavorite={user.FavoriteMovies.includes(movie._id)}
                />
            </Col>
        ))
        : <Col>
        <p>There are no favorites Movies</p>
        </Col>
        }
    </Row>
</Row>
  )
}

export default FavoriteMovies