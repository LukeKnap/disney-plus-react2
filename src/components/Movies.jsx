import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesCollection = collection(db, "nazev_kolekce");
      const movieSnapshot = await getDocs(moviesCollection);
      const movieList = movieSnapshot.docs.map((doc) => doc.data());
      setMovies(movieList);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <a>
        <img src="/images/movie-icon.svg" alt="MOVIES" />
        <span>MOVIES</span>
      </a>
      {movies.map((movie, index) => (
        <div key={index}>
          <img src={movie.cardImg} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Movies;
