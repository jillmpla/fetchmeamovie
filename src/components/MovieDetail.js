//src/components/MovieDetail.js
//This component fetches and displays detailed information about a movie using the OMDb API.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import "../App.css";

function MovieDetail() {
    //retrieve the OMDb API key from environment variables
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

    //get the IMDb ID from the URL
    const { id } = useParams();

    //set up navigation hook to redirect users
    const navigate = useNavigate();

    //component state for movie data, loading indicator, and error message
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //useEffect runs once on mount or when `id` changes
    useEffect(() => {
        //validate IMDb ID format before making API request
        if (!id || !/^tt\d{7,8}$/.test(id)) {
            setError("Invalid movie ID.");
            setLoading(false);
            return;
        }

        setLoading(true);

        //fetch movie data from OMDb API
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
            .then((response) => {
                //basic network response validation
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data) => {
                //if response is valid, store the movie data
                if (data.Response === "True") {
                    setMovie(data);
                    setError("");
                } else {
                    //handle API-level errors like movie not found
                    setError("No movie found.");
                }
            })
            .catch((err) => {
                //log and show generic error for fetch failures
                console.error("Fetch error:", err);
                setError("Error fetching movie.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, API_KEY]);

    return (
        <>
            <Header />

            <div className="movie-detail">
                {loading && <p>Loading...</p>}

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <button
                            onClick={() => navigate("/")}
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                fontSize: "1rem",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: "#0056a3",
                                color: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            Back to Home
                        </button>
                    </div>
                )}

                {!loading && !error && movie && (
                    <>
                        <h2>
                            {movie.Title} ({movie.Year})
                        </h2>
                        <p><strong>Director:</strong> {movie.Director || "N/A"}</p>
                        <p><strong>Main Actor:</strong> {movie.Actors?.split(",")[0] || "N/A"}</p>
                        <p><strong>Genre:</strong> {movie.Genre || "N/A"}</p>
                        <p><strong>Runtime:</strong> {movie.Runtime || "N/A"}</p>

                        {/* Display poster if available and valid */}
                        {movie.Poster && movie.Poster !== "N/A" && (
                            <img src={movie.Poster} alt={`${movie.Title} poster`} />
                        )}

                        {/* Display movie plot */}
                        <p>{movie.Plot}</p>

                        {/* External IMDb link */}
                        <p>
                            <strong>IMDb:</strong>{" "}
                            <a
                                href={`https://www.imdb.com/title/${movie.imdbID}`}
                                target="_blank"
                                rel="noopener noreferrer" //prevents reverse tabnabbing
                            >
                                {movie.imdbID}
                            </a>
                        </p>
                    </>
                )}
            </div>
        </>
    );
}

export default MovieDetail;


