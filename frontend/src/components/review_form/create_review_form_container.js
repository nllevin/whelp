import { connect } from 'react-redux';
import ReviewForm from './review_form';
import { fetchBusinessAndReviewsWithAuthors } from '../../actions/business_actions';
import { createReview } from '../../actions/review_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserId] || {},
  business: state.entities.businesses[ownProps.match.params.businessId] || {},
  currentUserReview: {
    authorId: state.session.currentUserId || null,
    businessId: ownProps.match.params.businessId || null,
    businessName: state.entities.businesses[ownProps.match.params.businessId] ? state.entities.businesses[ownProps.match.params.businessId].name : null,
    body: '',
    rating: 1
  },
  formType: 'create'
});

const mapDispatchToProps = dispatch => ({
  fetchBusinessAndReviewsWithAuthors: businessId => dispatch(fetchBusinessAndReviewsWithAuthors(businessId)),
  formAction: review => dispatch(createReview(review))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewForm);