import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search_bar/search_bar';
import GreetingContainer from '../header_nav/greeting_container';
import './splash.css';

const Splash = () => (
  <div className="splash">
    <header className="splash-nav">
      <div>
        {/* potentially Write a Review, Events, & Talk */}
      </div>
      <GreetingContainer />
    </header>
    <div className="splash-main">
      <div className="splash-icon-container">
        <div className="whelp-logo">
          <span>whelp</span><Link to="/splash"><i className="splash-y-icon"></i></Link>
        </div>
      </div>
      <SearchBar />
      <footer className="splash-footer">
        <span>Gold Coast, Australia</span>
        <span>Photo by <a href="https://unsplash.com/@leio">Leio M.</a></span>
      </footer>
    </div>
  </div>
);

export default Splash;