import "./movie-card.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, CardBody, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import axios from 'axios';

export const MovieCard = ({ movie, isFavorite, user, setUser, movies }) => {
  const token = localStorage.getItem('token');
  

    // Toggle Favorite Movie
const toggleFav = (id) => {
  if (!user) {
    console.log('User is not defined');
    return;
  }
  const userId = user._id;
  console.log(toggleFav);

  //check if the movie ID exists in the movies state
  const movieExists = movies.some(movie => movie._id === id);
  console.log('movieExists',movieExists);
  if (!movieExists) {
    return;
  }
  console.log('fav includes',user.FavoriteMovies.includes(id));
  if (user.FavoriteMovies.includes(id)) {

    axios.delete(`https://myflix-api-qeb7.onrender.com/users/${user._id}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;
      console.log('movie remobved', data);
      setUser(data);
    })
    .catch(e => {
      console.error('error removing the movie from favorites', e);
    });
  } else {
    if (!user.FavoriteMovies.includes(id)){
      axios.post(`https://myflix-api-qeb7.onrender.com/users/${user._id}/movies/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;
      console.log('movie added', data);
      setUser(data);
    })
    .catch(e => {
      console.error('error adding the movie to favorites', e);
    });
  }
    }

};


  return (
      <Card className="w-100" id="Movie-Card">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Card.Img variant="top" src={movie.ImagePath}  alt={`Image of ${movie.Title}`} className="MoviecardImage"/>
          </Link>  
        

        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title style={{ fontSize: '1em', fontWeight: '300' }} className="mx-1 mt-2">{movie.Title}</Card.Title>
            <div className="d-flex justify-content-center mt-2 mb-2" style={{backgroundColor: 'var(--secondary-color)', width: '30px', height: '20px'}}>
              <div className="ml-3">
                <Card.Text style={{ fontSize: '0.8em', fontWeight: '200' }}>{movie.Rating}</Card.Text>
              </div>
            </div>
          </div>
          <div>
            {isFavorite ? (
              <BookmarkHeartFill size={40} color="var(--secondary-color)" className="fav-button mt-2 me-1" onClick={() => toggleFav(movie._id)}/>
              ) : (
              <BookmarkHeart size={40} color="var(--secondary-color)" className="fav-button mt-2 me-1" onClick={() => toggleFav(movie._id)}/>
            )}
          </div>
        </div>
  </Card> 
    
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
};

MovieCard.defaultProps = {
  movie: {
    _id: "",
    title: ""
  }
}