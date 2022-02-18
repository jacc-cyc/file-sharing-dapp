import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './components/pages/Explore';
import FAQ from './components/pages/FAQ';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/explore' element={<Explore />}/>
          <Route path='/faq' element={<FAQ />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
