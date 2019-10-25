import { connect } from 'react-redux';
import { fetchBusinesses } from '../../actions/business_actions';
import BusinessIndex from './business_index';

const mapStateToProps = state => ({
  businesses: Object.values(state.entities.businesses)
});

const mapDispatchToProps = dispatch => ({
  fetchBusinesses: () => dispatch(fetchBusinesses())                            // will change for search/filters
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessIndex);