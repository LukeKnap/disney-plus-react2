import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  selectRecommend,
  selectNewDisney,
  selectOriginal,
  selectTrending,
} from '../features/movie/movieSlice';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(true);

  const moviesRecommend = useSelector(selectRecommend);
  const moviesNewDisney = useSelector(selectNewDisney);
  const moviesOriginal = useSelector(selectOriginal);
  const moviesTrending = useSelector(selectTrending);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  const handleClose = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    setCategory('all');
    setFilteredMovies([]);
    setSearchError('');
  };

  const getFilteredMovies = () => {
    switch (category) {
      case 'recommend':
        return moviesRecommend || [];
      case 'newDisney':
        return moviesNewDisney || [];
      case 'original':
        return moviesOriginal || [];
      case 'trending':
        return moviesTrending || [];
      default:
        return [].concat(
          moviesRecommend,
          moviesNewDisney,
          moviesOriginal,
          moviesTrending
        ).filter(Boolean);
    }
  };

  const fetchMovies = () => {
    let movies = getFilteredMovies();
    if (searchTerm) {
      movies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredMovies(movies);
    setSearchError(movies.length ? '' : 'No movies found matching your criteria.');
  };

  return (
    <>
      {isSearchOpen && (
        <ResultsContainer>
          <CloseButton onClick={handleClose}>X</CloseButton>
          <form onSubmit={handleSearchSubmit}>
            <SearchInput
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <CategorySelect value={category} onChange={handleCategoryChange}>
              <option value="all">All</option>
              <option value="recommend">Recommended</option>
              <option value="newDisney">New Disney</option>
              <option value="original">Originals</option>
              <option value="trending">Trending</option>
            </CategorySelect>
            <SearchButton type="submit">SEARCH</SearchButton>
          </form>
          <ErrorMessage>{searchError}</ErrorMessage>
          <MoviesList>
            {filteredMovies.map((movie, index) => (
              <MovieItem key={index}>
                <MovieImage src={movie.cardImg} alt={movie.title} />
                <MovieTitle>{movie.title}</MovieTitle>
              </MovieItem>
            ))}
          </MoviesList>
        </ResultsContainer>
      )}
    </>
  );
};

const CategorySelect = styled.select`
  padding: 10px;
  margin-left: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultsContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("/images/home-background.png") center center / cover no-repeat fixed;
  padding: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  text-align: center;
  letter-spacing: normal;
  color: #fff;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: #fff;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
`;

const SearchInput = styled.input`
  width: 80%; // Šířka pole může být přizpůsobena podle designu
  padding: 15px;
  border: none;
  border-radius: 8px;
  margin-bottom: 15px; // Odstup od dalších prvků
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  background-color: #fff; // Bílé pozadí pro viditelnost
  color: #333; // Barva textu, pro lepší kontrast
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Lehký stín pro lepší vyniknutí pole
  
  &::placeholder {
    color: #aaa; // Barva placeholderu
  }

  &:focus {
    outline: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Zvýraznění stínu při fokusu
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 1rem;
  margin-top: 10px;
`;

const MoviesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const MovieItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const MovieImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const MovieTitle = styled.p`
  font-size: 1.4rem;
  text-align: center;
  margin: 0;
`;

export default Search;
