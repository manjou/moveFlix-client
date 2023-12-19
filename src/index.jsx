import { createRoot } from 'react-dom/client';
import { MainView  } from './components/main-view/main-view';
// import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';


// Import statement to indicate that you need to bundle `./indes.scss``
import "./index.scss";
import "./custom.scss";

// Main component (will eventually use all the others)
const MoveFlixApplication = () => {
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

  return (
    <Container fluid>
          <MainView  toggleFav={toggleFav} />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MoveFlixApplication />);
