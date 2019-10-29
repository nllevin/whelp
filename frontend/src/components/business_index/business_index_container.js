import { connect } from 'react-redux';
import { searchBusinesses } from '../../actions/business_actions';
import BusinessIndex from './business_index';
import { getBusinessesSearchResults } from '../../reducers/selectors';

const mapStateToProps = state => ({
  businesses: getBusinessesSearchResults(state)
});

const mapDispatchToProps = dispatch => ({
  searchBusinesses: searchParams => dispatch(searchBusinesses(searchParams))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessIndex);