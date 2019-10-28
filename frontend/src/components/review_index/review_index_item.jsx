import React from 'react';
import { connect } from 'react-redux';

const ReviewItem = ({ review, author }) => (
  <li className="review-index-item">
    <div className="review-index-item-author">
      <img className="review-author-avatar" src={author.avatarUrl} alt=""></img> 
      <div className="review-index-author-details">
        <span className="review-index-item-author-name">{author.firstName} {author.lastName}</span>
        <span className="review-index-author-zipcode">{author.zipCode}</span>
      </div>
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

const mapStateToProps = (state, ownProps) => ({
  author: state.entities.users[ownProps.review.authorId]
});

export default connect(
  mapStateToProps,
  null
)(ReviewItem);