//Entry point for React application that mounts the App component to the DOM.
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

//get the DOM element to mount the React app into
const container = document.getElementById('root');

//create a root using React concurrent rendering API
const root = createRoot(container);

//render the app inside React.StrictMode
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


