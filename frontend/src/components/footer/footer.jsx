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
        <h3>Whelp for Employers</h3>
        <a className="project-link" href="https://github.com/nllevin">Noah Levin</a>
        <a className="project-link" href="https://github.com/Patrick-Mondala">Patrick Mondala</a>
      </div>
    </div>
    <figure className="footer-cityscape" />
  </div>
);

export default Footer;