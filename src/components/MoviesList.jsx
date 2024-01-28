import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesCollection = collection(db, "movies");
      const movieSnapshot = await getDocs(moviesCollection);
      const movieList = movieSnapshot.docs.map((doc) => doc.data());
      setMovies(movieList);
    };

    fetchMovies();
  }, []);

  return (
    <Grid>
      {movies.map((movie, index) => (
        <Card key={index}>
          <MovieImage src={movie.cardImg} alt={movie.title} />
          <Title>{movie.title}</Title>
          <Subtitle>{movie.subTitle}</Subtitle>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
  align-items: start;
  padding: 10rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, border 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    border: 2px solid white;
  }
`;

const Title = styled.h2`
  font-weight: normal;
`;

const Subtitle = styled.p``;

export default MoviesList;
