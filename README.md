# 🎬 Fetch Me a Movie

A sleek and responsive React app that lets users search for movies by title, browse matching results, and view detailed information powered by the [OMDb API](https://www.omdbapi.com/).

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

### UI/UX Improvements
- Fully responsive layout using modern, accessible styling
- Consistent use of color palette, spacing, and the Poppins font
- Visually enhanced loading states and error handling

### Accessibility

Accessibility is built into the core of the user experience:

- **ARIA Labels:** Interactive elements, like search inputs and links, are labeled for screen readers.
- **Keyboard Navigation:**  
  - Movie search results are fully keyboard focusable via `tabIndex`  
  - Each movie link is accessible with keyboard controls  
- **Live Feedback:** Clear feedback is shown for loading, search errors, and fallbacks without disrupting navigation

---

## 🚀 Setup Instructions

### 1. Clone the repository:
```bash
git clone <repository-url>
cd fetch-me-a-movie
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
  ├─ App.js
  ├─ App.css
  ├─ index.css
  └─ index.js
```

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE.txt).

You are free to use, modify, and distribute this code for personal or commercial use. Attribution is appreciated.

## If you find this project useful, consider giving it a star! ⭐


