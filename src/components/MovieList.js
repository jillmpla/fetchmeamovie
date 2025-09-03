/**
 * //src/components/MovieList.js
 *  - Debounced search UI for OMDb.
 *  - Shows a grid of poster cards when posters exist; falls back to a simple list otherwise.
 *  - Handles loading, empty, and error states (including OMDb's own error messages).
 */

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import mockMovies from "../data/moviesData"; //dev-only fallback

//helper that returns a poster URL only when it's a valid string.
const POSTER = (m) => (m.Poster && m.Poster !== "N/A" ? m.Poster : null);

function MovieList(){
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

    // ----- UI state -----
    const [term, setTerm] = useState("");     //raw input value (untrimmed)
    const [movies, setMovies] = useState([]); //current search results
    const [loading, setLoading] = useState(false); //spinner flag while fetching
    const [error, setError] = useState("");        //user-facing error message (from OMDb or network)

    // ----- Refs for debounce & race-condition protection -----
    const tRef = useRef();      //holds the debounce timer id
    const latest = useRef("");  //remembers the latest query string we issued

    useEffect(() => {
        if (process.env.NODE_ENV === "development" && !API_KEY){
            setMovies(mockMovies);
            setError("Dev preview: missing OMDb API key, showing mock data.");
        }
        return () => tRef.current && clearTimeout(tRef.current);
    }, [API_KEY]);

    const onChange = (e) => {
        const raw = e.target.value;
        setTerm(raw);

        if (tRef.current) clearTimeout(tRef.current);

        tRef.current = setTimeout(async () => {
            const q = raw.trim();   //only the trimmed string is used for the actual query
            latest.current = q;     //remember the outgoing query to guard against stale results

            if (q.length < 3){
                setMovies([]);
                setError("");
                setLoading(false);
                return;
            }

            if (!API_KEY){
                setMovies([]);
                setError("Missing OMDb API key.");
                return;
            }

            // ---- Fetch from OMDb ----
            try {
                setLoading(true);

                //limit to movies and page 1.
                const url = `https://www.omdbapi.com/?s=${encodeURIComponent(q)}&type=movie&page=1&apikey=${API_KEY}`;
                const r = await fetch(url);

                const data = await r.json();

                if (latest.current !== q) return;

                if (data.Response === "True" && Array.isArray(data.Search)) {
                    setMovies(data.Search);
                    setError("");
                } else {
                    const msg = data.Error || "No movies found.";
                    setMovies([]);
                    setError(msg);
                }
            } catch (err) {
                console.error("Fetch failed:", err);
                setMovies([]);
                setError("Search unavailable. Please try again.");
            } finally {
                setLoading(false);
            }
        }, 450);
    };

    return (
        <section className="container movie-list" aria-labelledby="search-heading">
            <div className="panel search-card">
                {/* Heading labels the landmark for screen readers */}
                <h2 id="search-heading" className="search-title">Search for a movie…</h2>

                {/* Visually-hidden label keeps the input accessible without cluttering the UI */}
                <label htmlFor="movie-search" className="visually-hidden">Search for movies</label>

                {/* Search input */}
                <input
                    id="movie-search"
                    className="search-input"
                    type="search"
                    placeholder="Type at least 3 characters"
                    autoComplete="off"
                    value={term}
                    onChange={onChange}
                />

                {/* Live loading & error messages for assistive tech */}
                {loading && <p className="status" role="status">Movies are loading…</p>}
                {error && <p className="status error" role="alert">{error}</p>}

                {/* If we have results and at least one has a poster, show the grid of poster cards... */}
                {movies.length > 0 && movies.some(POSTER) ? (
                    <div className="results" aria-live="polite">
                        {movies.map(m => (
                            <article className="result-card" key={m.imdbID}>
                                <Link
                                    to={`/movies/${m.imdbID}`}
                                    aria-label={`${m.Title || "Untitled"} (${m.Year || "N/A"})`}
                                >
                                    <div
                                        className="result-media"
                                        style={{ backgroundImage: `url('${POSTER(m) || ""}')` }}
                                        //if the poster is missing, expose a labeled role for screen readers
                                        role={POSTER(m) ? undefined : "img"}
                                        aria-label={POSTER(m) ? undefined : `${m.Title} poster not available`}
                                    />
                                </Link>

                                {/* Title below the image */}
                                <div className="result-body">
                                    <h3 className="result-title">
                                        <Link to={`/movies/${m.imdbID}`}>
                                            {m.Title || "Untitled"} {m.Year ? `(${m.Year})` : ""}
                                        </Link>
                                    </h3>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : movies.length > 0 ? (
                    // ...otherwise fall back to a simple, readable list of links
                    <ul className="result-list" aria-live="polite">
                        {movies.map(m => (
                            <li key={m.imdbID}>
                                <Link to={`/movies/${m.imdbID}`}>
                                    {m.Title || "Untitled"} {m.Year ? `(${m.Year})` : ""}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : null /* no results yet */}
            </div>
        </section>
    );
}

export default MovieList;
