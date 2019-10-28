import React from 'react';
import ReviewIndexItem from './review_index_item';

import './review_index.css';

class ReviewIndex extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.reviews.map(review =>
            <ReviewIndexItem key={`review-index-${review._id}`} review={review} />)
          }
        </ul>
      </div>
    )
  }
}

export default ReviewIndex;