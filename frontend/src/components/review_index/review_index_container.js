import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReviewIndex from './review_index';

const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.currentUserId || "",
  reviews: Object.values(state.entities.reviews).filter(review => review.businessId === ownProps.match.params.businessId)
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewIndex));