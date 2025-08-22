//src/components/MovieList.js
//displays a list of movies from the OMDb API with search functionality.

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import mockMovies from "../data/moviesData"; 

function MovieList() {
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const [searchTerm, setSearchTerm] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceTimeout = useRef(null);
  const latestQueryRef = useRef(""); 

  useEffect(() => {
    setLoading(false);
    setMoviesData([]);
    setError("");

    if (process.env.NODE_ENV === "development" && !API_KEY) {
      setMoviesData(mockMovies);
      setError("Dev preview: missing OMDb API key, showing mock data.");
    }

    //cleanup on unmount for any pending debounce
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  //debounced search with basic input validation
  const handleSearchChange = (event) => {
    const rawTerm = event.target.value;
    setSearchTerm(rawTerm); //store raw input including spaces

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      const trimmedTerm = rawTerm.trim(); 
      latestQueryRef.current = trimmedTerm;

      if (trimmedTerm.length < 3) {
        setMoviesData([]);
        setError("");
        setLoading(false);
        return;
      }

      if (!API_KEY) {
        setMoviesData([]);
        setError("Missing OMDb API key.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(trimmedTerm)}&apikey=${API_KEY}`
        );

        if (!response.ok) throw new Error("Network response error");

        const data = await response.json();

        //ignore if a newer query has been issued during await
        if (latestQueryRef.current !== trimmedTerm) return;

        if (data.Search) {
          setMoviesData(data.Search);
          setError("");
        } else {
          setMoviesData([]);
          setError("No movies found.");
        }
      } catch (err) {
        console.error("Search fetch failed:", err);
        setMoviesData([]);
        setError("Search unavailable. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="movie-list">
      <h2>Search for a movie...</h2>

      {/* search input with real-time debounce */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label="Search for movies"
      />

      {/* show loading indicator */}
      {loading && <p>Movies are loading...</p>}

      {/* show error, but still render content area */}
      {error && <p className="error-message">{error}</p>}

      {/* render list only if movies exist */}
      {moviesData.length > 0 && (
        <ul>
          {moviesData.map((movie) => (
            <li
              key={movie.imdbID}
              tabIndex="0"
              aria-label={`${movie.Title || "Untitled"} (${movie.Year || "N/A"})`}
            >
              <Link to={`/movies/${movie.imdbID}`}>
                {movie.Title || "Untitled"} ({movie.Year || "N/A"})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;





