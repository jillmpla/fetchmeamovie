import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="app-shell">
                <Header />
                <main id="main" role="main">
                    <Routes>
                        <Route path="/" element={<MovieList />} />
                        <Route path="/movies/:id" element={<MovieDetail />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

