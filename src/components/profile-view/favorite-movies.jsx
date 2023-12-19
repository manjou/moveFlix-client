import React from 'react'
import { Row, Col, Card } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

function FavoriteMovies({ favoriteMovieList, toggleFav, user }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
          <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2> 
          </Col>
        </Row>
        <Row className="justify-content-center">
            {
            favoriteMovieList?.length !== 0 ?
            favoriteMovieList?.map((movie) => (
                <Col xs={12} md={6} lg={3} xl={2} className="mb-3" key={movie._id}>
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
      </Card.Body>
    </Card>


  )
}

export default FavoriteMovies