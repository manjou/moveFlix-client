import React from 'react'
import { Row, Col } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

function FavoriteMovies({ favoriteMovieList, toggleFav, user }) {
  return (
    <Row>
    <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2>
    <Row className="justify-content-center">
        {
        favoriteMovieList?.length !== 0 ?
        favoriteMovieList?.map((movie) => (
            <Col sm={7} md={5} lg={3} xl={2} className="mx-2 mt-2 mb-5 col-6 similar-movies-img" key={movie._id}>
                <MovieCard
                    movie={movie}
                    toggleFav={toggleFav}
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