// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for proper map rendering
import './index.css'; // Your main CSS file

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
