# 🎬 Fetch Me a Movie

A responsive, accessible movie finder built with React. Search by title to browse posters and quick facts, then view full details including director, cast, plot, and runtime, powered by the [OMDb API](https://www.omdbapi.com/).

---

## 🌐 Live Demo

Try the app live here: **[fetchmeamovie.com](https://fetchmeamovie.com)**

---

## 🔍 What This App Does

- Search for movies by title using the OMDb API
- View detailed info about each movie (poster, director, plot, runtime, genre, main actor)
- Works well on both desktop and mobile

---

## 🛠 Features & Enhancements

### API Integration
- Fetches real-time movie data from OMDb
- Validates IMDb IDs and handles bad requests 
- Displays fallback mock data if the API is unavailable

### UI and UX
- Token-based theme using brand palette and solid dark surfaces
- Manrope font with larger base size for readability
- Fully responsive layout with consistent spacing
- Animated gradient borders on panels (content stays on solid backgrounds)
- Pill-style nav buttons with gradient ring on hover/focus
- Subtle result fade-ins; clear loading/error states; reduced-motion friendly

### Accessibility
- Semantic roles and ARIA labels on interactive elements
- Keyboard-friendly: visible focus rings; all results are tabbable links
- Live status messaging for loading and errors
- High contrast: white text on dark surfaces (WCAG-friendly)
- Respects `prefers-reduced-motion`

---

## 🚀 Setup Instructions

### 1. Clone the repository:
```bash
git clone <repository-url>
cd fetchmeamovie
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Add your OMDb API key:

Create a `.env` file in the root of the project and add your API key like this:

```env
REACT_APP_OMDB_API_KEY=your_api_key_here
```

> You can get a free API key from [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)

### 4. Start the development server:
```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000)

---

## 💻 Technologies Used

### React.js  
Used for building the component-based UI with dynamic rendering, state management (useState, useEffect), and routing via React Router.

### Fetch API  
Used for making asynchronous HTTP requests to the OMDb API to retrieve movie search results and details.

### [OMDb API](https://www.omdbapi.com/)  
The Open Movie Database API provides:
- Search by title (s=)
- Detail lookup by IMDb ID (i=), Returns structured JSON used to populate the app’s UI.

---

## 📁 Project Structure

```
public/
  ├─ favicon.ico
  ├─ index.html
  ├─ movieicon.png
  └─ preview.png

src/
  ├─ components/
  │    ├─ Footer.js
  │    ├─ Header.js
  │    ├─ MovieDetail.js
  │    ├─ MovieList.js
  ├─ data/
  │    └─ moviesData.js
  ├─ App.css
  ├─ App.js
  └─ index.js
```

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE.txt).

You are free to use, modify, and distribute this code for personal or commercial use. Attribution is appreciated.

## If you find this project useful, consider giving it a star! ⭐


