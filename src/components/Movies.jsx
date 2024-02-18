import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesCollection = collection(db, "movies");
      const movieSnapshot = await getDocs(moviesCollection);
      const movieList = movieSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(movieList);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      {movies.map((movie, index) => (
        <Link to={`/movie/${movie.id}`} key={index}>
          <div>
            <img src={movie.cardImg} alt={movie.title} />
            <h2>{movie.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Movies;
