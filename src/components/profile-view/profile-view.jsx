import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { PersonSquare } from "react-bootstrap-icons";
import FavoriteMovies from "./favorite-movies";
import UserForm from "./user-form";
import "./profile-view.scss";


export const ProfileView = ({ user, movies, setUser, toggleFav }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthDay] = useState(user.BirthDay ? new Date(user.BirthDay).toISOString().split('T')[0] : '');
  const [password, setPassword] = useState(''); // initial value can be empty or user's current password
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);


  // Navigate
  const navigate = useNavigate();

  // Return list of favorite movies
  const favoriteMovieList = movies.filter(m => user.FavoriteMovies.includes(m._id));

  // get Token
  const token = localStorage.getItem('token');


  // Update user info / HANDLE UPDATE
  const handleUpdate = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    const data ={
      Username: username,
      Email: email,
    }

    if (password) {
      Password: password;
    }

    if (birthday) {
      data.Birthday = new Date(birthday).toISOString().split('T')[0]; // Convert birthday in date object
    }
 
    fetch(`https://myflix-api-qeb7.onrender.com/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(async (response) => {
      if (response.ok) {
        const text = await response.text();
        const updatedUser = JSON.parse(text);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setUserInfo(updatedUser); // Update the userInfo state
        alert("Update User was successful");
      } else {
        alert("Update failed")
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  // Delete User
  const handleDelete = () => {
    fetch(`https://myflix-api-qeb7.onrender.com/users/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("USER HAS BEEN DELETED")
        localStorage.clear();
        navigate('/'); // back to home page
      } else {
        alert("Something went wrong.")
      }
    })
  }


  return (
    <Container className="my5"> 
      <UserForm 
        user={userInfo} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete} 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        email={email} 
        setEmail={setEmail} 
        birthday={birthday} 
        setBirthday={setBirthDay} 
      />

      <FavoriteMovies favoriteMovieList={favoriteMovieList } toggleFav={toggleFav} user={user} />

    </Container>
  );
};