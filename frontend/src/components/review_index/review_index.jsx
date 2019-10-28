import React from 'react';
import ReviewIndexItem from './review_index_item';

class ReviewIndex extends React.Component {
  render() {
    const { reviews } = this.props;
    const uniqueReviews = reviews.filter(review => review.authorId !== this.props.currentUserId);
    return (
      <div>
        <ul>
          {uniqueReviews.map(review =>
            <ReviewIndexItem key={`review-index-${review._id}`} review={review} />)
          }
        </ul>
      </div>
    )
  }
}

export default ReviewIndex;