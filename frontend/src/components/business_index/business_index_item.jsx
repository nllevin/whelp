import React from 'react';
import { Link } from 'react-router-dom';
import "./business_index_item.css";

const BusinessIndexItem = ({ idx, business }) => (
  <li className="business-index-item-container">
    <Link to={`/businesses/${business._id}`} className="business-index-item-image-container">
      <img src={business.imageUrl} alt={business.name}/>
    </Link>
    <div className="business-index-item-info">
      <header>
        <main>
          <p>{idx + 1}. <Link to={`/businesses/${business._id}`}>{business.name}</Link></p>
          <div className="business-index-item-reviews">
            <span className={`half-stars-${Math.round(business.avgUserRating * 2)}`}></span>
            <span>{business.numReviews} review{business.numReviews === 1 ? "" : "s"}</span>                                              {/*make dynamic*/}
          </div>
          <span>{"$".repeat(business.priceRating)}</span>
        </main>
        <aside>
          <span>{business.phoneNumber}</span>
          <span>{business.address}</span>
        </aside>
      </header>
      <p>{business.snippet}</p>
    </div>
  </li>
);

export default BusinessIndexItem;