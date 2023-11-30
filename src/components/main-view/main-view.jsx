import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";



export const MainView = () => {
  const [movies, setMovies] = useState([
      {
        "_id": 1,
        "Title": "Schindler's List",
        "Description": "Schindler's List is a 1993 American epic historical drama film directed...",
        "Director": {
          "Name": "Steven Spielberg",
          "Bio": "Steven Spielberg is an American film director, producer, and screenwriter.",
          "Birth": "1946"
        },
        "Genre": {
          "Name": "Historical Drama",
          "Description": "Historical drama films are set in the past and focus on historical events."
        },
        "ImagePath": "https://flxt.tmsimg.com/assets/p15227_p_v13_be.jpg",
        "Featured": true,
        "Release": "1994",
        "Actors": ["Liam Neeson", "Ben Kingsley"]
      },
      {
        "_id": 2,
        "Title": "Titanic",
        "Description": "Titanic is a 1997 American epic romance and disaster film directed by...",
        "Director": {
          "Name": "James Cameron",
          "Bio": "James Cameron is a Canadian film director, producer, and screenwriter.",
          "Birth": "1954"
        },
        "Genre": {
          "Name": "Romance",
          "Description": "Romance films are love stories that focus on passion, emotion, and the..."
        },
        "ImagePath": "https://www.tvguide.com/a/img/catalog/provider/1/2/1-9050537522.jpg",
        "Featured": false,
        "Release": "1997",
        "Actors": ["Leonardo DiCaprio", "Kate Winslet"]
      },
      {
        "_id": 3,
        "Title": "Spirited Away",
        "Description": "Spirited Away is a 2001 Japanese animated fantasy film written and directed...",
        "Director": {
          "Name": "Hayao Miyazaki",
          "Bio": "Hayao Miyazaki is a Japanese animator, director, and producer.",
          "Birth": "1941"
        },
        "Genre": {
          "Name": "Animation",
          "Description": "Animation films involve the rapid display of a sequence of images to create..."
        },
        "ImagePath": "https://www.bestmovieposters.co.uk/wp-content/uploads/2019/02/SPIRITED.jpg",
        "Featured": true,
        "Release": "2001",
        "Actors": ["Rumi Hiiragi", "Miyu Irino"]
      },
      {
        "_id": 4,
        "Title": "A Clockwork Orange",
        "Description": "A Clockwork Orange is a 1971 dystopian crime film adapted, produced, and directed...",
        "Director": {
          "Name": "Stanley Kubrick",
          "Bio": "Stanley Kubrick was an American film director, producer, and screenwriter.",
          "Birth": "1928"
        },
        "Genre": {
          "Name": "Dystopian Crime",
          "Description": "Dystopian crime films are set in a society characterized by human misery..."
        },
        "ImagePath": "https://alternativemovieposters.com/wp-content/uploads/2018/02/liza_clockwork.jpg",
        "Featured": true,
        "Release": "1971",
        "Actors": ["Malcolm McDowell", "Patrick Magee"]
      },
      {
        "_id": 5,
        "Title": "Inglourious Basterds",
        "Description": "Inglourious Basterds is a 2009 alternate history war film written and...",
        "Director": {
          "Name": "Quentin Tarantino",
          "Bio": "Quentin Tarantino is an American filmmaker and actor known for his nontraditional...",
          "Birth": "1963"
        },
        "Genre": {
          "Name": "War Drama",
          "Description": "War drama films depict the effects of war on individuals and societies..."
        },
        "ImagePath": "https://vignette4.wikia.nocookie.net/inglouriousbasterds/images/c/c3/Inglourious_Basterds_poster.jpg/revision/latest?cb=20131226131149",
        "Featured": true,
        "Release": "2009",
        "Actors": ["Brad Pitt", "Mélanie Laurent"]
      }
    ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
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