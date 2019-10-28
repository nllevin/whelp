import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBusinessAndReviewsWithAuthors } from '../../actions/business_actions';
import BusinessShow from "./business_show";

const mapStateToProps = (state, ownProps) => ({
  business: state.entities.businesses[ownProps.match.params.businessId] || {},
  reviews: Object.values(state.entities.reviews).filter(review => review.businessId === ownProps.match.params.businessId) || []
});

const mapDispatchToProps = dispatch => ({
  fetchBusinessAndReviewsWithAuthors: businessId => dispatch(fetchBusinessAndReviewsWithAuthors(businessId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessShow));