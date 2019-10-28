import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBusinessAndReviewsWithAuthors } from '../../actions/business_actions';
import { deleteReview } from '../../actions/review_actions';
import BusinessShow from "./business_show";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserId] || {},
  business: state.entities.businesses[ownProps.match.params.businessId] || {},
  reviews: Object.values(state.entities.reviews)
    .filter(review => review.businessId === ownProps.match.params.businessId) || [],
  currentUserReview: Object.values(state.entities.reviews)
    .find(review => review.businessId === ownProps.match.params.businessId && review.authorId === state.session.currentUserId) || {}
});

const mapDispatchToProps = dispatch => ({
  fetchBusinessAndReviewsWithAuthors: businessId => dispatch(fetchBusinessAndReviewsWithAuthors(businessId)),
  deleteReview: reviewId => dispatch(deleteReview(reviewId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessShow));