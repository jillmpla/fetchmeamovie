//src/App.js
//Root component of the app that sets up routing and shared layout.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
          {/* Persistent header with title and navigation */}
          <Header />

          {/* Main content area with routes */}
          <main role="main">
            <Routes>
              {/* Homepage route that displays search and movie list */}
              <Route path="/" element={<MovieList />} />

              {/* Movie detail route that shows individual movie info by IMDb ID */}
              <Route path="/movies/:id" element={<MovieDetail />} />
            </Routes>
          </main>

          {/* Persistent footer with site credits and reload link */}
          <Footer />
        </div>
      </Router>
  );
}

export default App;

