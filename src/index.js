import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {  
  BrowserRouter as Router,  
}   
from 'react-router-dom';  

import './assets/css/main.css';


const main = ReactDOM.createRoot(document.getElementById('main'));
main.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
