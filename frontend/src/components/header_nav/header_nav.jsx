import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarContainer from '../search_bar/search_bar_container';
import GreetingContainer from './greeting_container';
import '../reset.css';
import './header_nav.css';

const HeaderNav = () => {
  return (
    <div className="header-nav-container">
      <header className="header-nav">
        <Link to="/splash" className="whelp-logo">
          <span>whelp</span>
          <i className="y-icon"></i>
        </Link>
        <SearchBarContainer />
        <GreetingContainer />
      </header>
    </div>
  )
};

export default HeaderNav;