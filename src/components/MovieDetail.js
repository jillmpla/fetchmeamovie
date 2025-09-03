/**
 * //src/components/MovieDetail.js
 *  - Fetches and displays details for a single movie by IMDb ID (from the URL).
 *  - Handles loading and error states.
 *  - Uses accessible markup (landmarks, roles, alt text, aria labels).
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieDetail(){
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
    const { id } = useParams();
    const navigate = useNavigate();

    // ----- UI state -----
    const [movie, setMovie] = useState(null);     //holds the fetched movie object
    const [loading, setLoading] = useState(true); //spinner/indicator flag
    const [error, setError] = useState("");       //user-facing error message

    /**
     * Fetch the movie when the component mounts OR when the :id changes.
     * - Validates the IMDb ID format before fetching.
     * - Parses OMDb JSON and updates state.
     * - Friendly error messages for invalid id / not found / network issues.
     */
    useEffect(() => {
        if (!id || !/^tt\d{7,8}$/.test(id)){
            setError("Invalid movie ID.");
            setLoading(false);
            return;
        }

        (async () => {
            try{
                setLoading(true);

                const r = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
                if(!r.ok) throw new Error("Network response was not ok");
                const data = await r.json();

                if (data.Response === "True"){
                    setMovie(data);
                    setError("");
                } else {
                    setError("No movie found.");
                }
            }catch(e){
                console.error(e);
                setError("Error fetching movie.");
            }finally{
                setLoading(false);
            }
        })();
    }, [id, API_KEY]);

    return (
        <section className="container movie-detail" aria-labelledby="movie-detail-heading">
            <div className="panel detail-card">
                {loading && <p className="status" role="status">Loading…</p>}
                {error && (
                    <>
                        <p className="status error" role="alert">{error}</p>
                        <button className="btn" onClick={() => navigate("/")}>Back to Home</button>
                    </>
                )}

                {!loading && !error && movie && (
                    <>
                        <h2 id="movie-detail-heading" className="detail-title">
                            {movie.Title} {movie.Year ? `(${movie.Year})` : ""}
                        </h2>

                        <div className="detail-header">
                            {movie.Poster && movie.Poster !== "N/A" ? (
                                <img className="poster" src={movie.Poster} alt={`${movie.Title} poster`} />
                            ) : (
                                <div className="poster" role="img" aria-label="Poster not available" />
                            )}

                            <div>
                                <p className="meta"><strong>Director:</strong> {movie.Director || "N/A"}</p>
                                <p className="meta"><strong>Main Actor:</strong> {movie.Actors?.split(",")[0] || "N/A"}</p>
                                <p className="meta"><strong>Genre:</strong> {movie.Genre || "N/A"}</p>
                                <p className="meta"><strong>Runtime:</strong> {movie.Runtime || "N/A"}</p>

                                <p className="plot">{movie.Plot}</p>

                                <p className="meta">
                                    <strong>IMDb:</strong>{" "}
                                    <a
                                        href={`https://www.imdb.com/title/${movie.imdbID}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {movie.imdbID}
                                    </a>
                                </p>

                                <button className="btn btn-back" onClick={() => navigate(-1)} aria-label="Go back">Back</button>

                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default MovieDetail;



