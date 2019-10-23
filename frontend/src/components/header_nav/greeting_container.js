import { connect } from 'react-redux';
import Greeting from './greeting';
import { getUserById } from '../../reducers/selectors';
import { logout } from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: getUserById(state, state.session.currentUserId)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);