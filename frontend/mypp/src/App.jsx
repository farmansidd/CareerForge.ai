import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes'; // Import AppRoutes
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AppRoutes /> {/* Use AppRoutes here */}
      </div>
    </Router>
  );
}

export default App;
