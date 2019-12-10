import React from 'react';
import '../reset.css';
import './footer.css';


const Footer = () => (
  <div className="footer-container">
    <div className="footer-content">
      <div className="footer-column">
        <h3>About</h3>
        <a href="https://github.com/nllevin/whelp">About Whelp</a>
      </div>
      <div className="footer-column">
        <h3>Github</h3>
        <a href="https://github.com/nllevin">Noah Levin</a>
        <a href="https://github.com/Patrick-Mondala">Patrick Mondala</a>
      </div>
      <div className="footer-column">
        <h3>LinkedIn</h3>
        <a href="https://www.linkedin.com/in/noah-levin-68b6b4197/">Noah Levin</a>
        <a href="https://www.linkedin.com/in/patrick-mondala/">Patrick Mondala</a>
      </div>
      <div className="footer-column">
        <h3>Angel List</h3>
        <a href="https://angel.co/noah-levin-2">Noah Levin</a>
        <a href="https://angel.co/patrick-mondala">Patrick Mondala</a>
      </div>
      <div className="footer-column">
        <h3>Portfolios</h3>
        <a href="https://www.nllevin.com/">Noah Levin</a>
        <a href="https://patrick-mondala.github.io/portfolio-site">Patrick Mondala</a>
      </div>
    </div>
    <figure className="footer-cityscape" />
  </div>
);

export default Footer;