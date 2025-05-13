//src/components/MovieList.js
//This component displays a list of movies from the OMDb API with search functionality.

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import mockMovies from "../data/moviesData";

function MovieList() {
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const [searchTerm, setSearchTerm] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debounceTimeout = useRef(null);

  //load initial default movie list on component mount
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=potter&apikey=${API_KEY}`)
        .then((response) => {
          if (!response.ok) throw new Error("Network error");
          return response.json();
        })
        .then((data) => {
          if (data.Search) {
            setMoviesData(data.Search);
            setError("");
          } else {
            setError("No movies found.");
          }
        })
        .catch((err) => {
          console.error("Fetch failed, loading mock data:", err);
          setMoviesData(mockMovies);
          setError("Live data unavailable. Showing mock data.");
        })
        .finally(() => setLoading(false));
  }, [API_KEY]);

  //debounced search with basic input validation
  const handleSearchChange = (event) => {
    const rawTerm = event.target.value;
    setSearchTerm(rawTerm); // store raw input including spaces

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      const trimmedTerm = rawTerm.trim(); // trim here for logic, not UI

      if (trimmedTerm.length < 3) {
        setMoviesData([]);
        setError("");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(trimmedTerm)}&apikey=${API_KEY}`);

        if (!response.ok) throw new Error("Network response error");

        const data = await response.json();

        if (data.Search) {
          setMoviesData(data.Search);
          setError("");
        } else {
          setMoviesData([]);
          setError("No movies found.");
        }
      } catch (err) {
        console.error("Search fetch failed, loading mock data:", err);
        setMoviesData(mockMovies);
        setError("Search unavailable. Showing mock data.");
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





