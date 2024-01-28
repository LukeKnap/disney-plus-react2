import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchError, setSearchError] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const moviesRef = collection(db, "movies");
    const querySnapshot = await getDocs(moviesRef);
    const movies = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredMovies = movies.filter((movie) => {
      const titleMatch = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory
        ? movie.type === selectedCategory
        : true;
      return titleMatch && categoryMatch;
    });

    if (filteredMovies.length > 0) {
      setFilteredMovies(filteredMovies);
      setIsOpen(true);
      setSearchError("");
    } else {
      setFilteredMovies([]);
      setIsOpen(true);
      setSearchError("The search term does not match any movies.");
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setFilteredMovies([]);
    setIsOpen(false);
    setSearchError("");
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SearchContainer>
      <a onClick={handleOpen}>
        <img src="/images/search-icon.svg" alt="SEARCH" />
        <span>SEARCH</span>
      </a>
      {isOpen && (
        <>
          <ResultsContainer>
            <CloseButton onClick={handleReset}>×</CloseButton>
            {searchError ? (
              <ErrorMessage>{searchError}</ErrorMessage>
            ) : (
              <>
                <h2>Search Results:</h2>
                {filteredMovies.length > 0 ? (
                  <MoviesList>
                    {filteredMovies.map((movie) => (
                      <MovieItem key={movie.id}>
                        <MovieImage src={movie.cardImg} alt={movie.title} />
                        <MovieTitle>{movie.title}</MovieTitle>
                      </MovieItem>
                    ))}
                  </MoviesList>
                ) : (
                  <ErrorMessage>No movies found.</ErrorMessage>
                )}
              </>
            )}
          </ResultsContainer>
          <form onSubmit={handleSubmit}>
            <SearchBar
              type="text"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={handleChange}
            />
            <CategorySelect
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="">All categories</option>
              <option value="recommend">Recommended</option>
              <option value="new">New</option>
              <option value="trending">Trending</option>
              <option value="original">Originals</option>
            </CategorySelect>
            <SubmitButton type="submit">Search</SubmitButton>
          </form>
        </>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
`;

const SearchBar = styled.input`
  width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
`;

const CategorySelect = styled.select`
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4a62d8;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: "Roboto", sans-serif;
`;

const ResultsContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("/images/home-background.png") center center / cover no-repeat
    fixed;
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
  right: 10px;
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

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 1rem;
  margin-top: 10px;
`;

export default Search;
