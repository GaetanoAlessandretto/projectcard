import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preferiti from './Preferiti';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <StateProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Preferiti" element={<Preferiti />} />
      </Routes>
    </StateProvider>
  </Router>
);

reportWebVitals();
