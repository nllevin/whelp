import React from 'react';

export default ({ review }) => (
  <li className="review-index-item">
    <div className="review-index-item-author">
      <span className="review-index-item-author-name">Placeholder :)</span>
    </div>
    <div className="review-index-item-content">
      <div className="review-index-item-rating-and-date">
        <span className={`half-stars-${(
        Math.round((review.rating) * 2))}`}></span>
        <span>{review.createdAt.slice(0,10)}</span>
      </div>
      <p>{review.body}</p>
    </div>
  </li>
)