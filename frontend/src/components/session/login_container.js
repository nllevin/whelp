import { connect } from "react-redux";
import {
  login,
  clearSessionErrors
} from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => ({
  errors: state.errors.session,
  formType: 'login'
});

const mapDispatchToProps = dispatch => ({
  processForm: user => dispatch(login(user)),
  clearErrors: () => dispatch(clearSessionErrors()),
  demoLogin: () => dispatch(login({ email: 'kitty@aol.com', password: 'hunter2' }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);