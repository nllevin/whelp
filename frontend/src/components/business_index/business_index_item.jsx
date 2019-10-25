import React from 'react';
import { Link } from 'react-router-dom';
import "./business_index_item.css";

const BusinessIndexItem = ({ idx, business }) => (
  <li className="business-index-item-container">
    <Link to={`/businesses/${business._id}`} className="business-index-item-image-container">
      <img src="puppy.jpg" alt="puppy"/>
    </Link>
    <div className="business-index-item-info">
      <header>
        <main>
          <p>{idx + 1}. <Link to={`/businesses/${business._id}`}>{business.name}</Link></p>
          <div className="business-index-item-reviews">
            <span className={`half-stars-${Math.round((Math.random() * 4 + 1) * 2)}`}></span>       {/*make dynamic*/}
            <span>5 reviews</span>                                              {/*make dynamic*/}
          </div>
          <span>{"$".repeat(business.priceRating)}</span>
        </main>
        <aside>
          <span>{business.phoneNumber}</span>
          <span>{business.address}</span>
        </aside>
      </header>
      <p>                 {/* need to fix text overflow with javascript */}
        My son and I stopped in again. Yummy IPA!! Had the Braised Short Ribs and so delicious. Soft, fell off the bone!!
        One of my patients suggested Legends and glad I listened
        Always sit at the bar, watching a game
      </p>
    </div>
  </li>
);

export default BusinessIndexItem;