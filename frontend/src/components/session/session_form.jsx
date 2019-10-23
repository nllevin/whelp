import React from "react";
import { Link } from "react-router-dom";
import '../reset.css';
import './session_form.css';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      zipCode: '',
      submitting: false,
      redBorder: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this.props.clearErrors();
    this._ismounted = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({submitting: true}, 
    () => this.props.processForm(this.state).then(() => this._ismounted && this.props.formType === 'login' ? this.setState({submitting: false, redBorder: true}) : this.setState({submitting: false})));
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const { errors, formType } = this.props;
    const isSignup = formType === "signup";
    const header = (
      <div className="session-form-header">
        <h2>
        {isSignup ? /* header text */
          "Sign Up for Whelp"
        : "Log In to Whelp"
        }</h2>
        <p className="session-form-subheading">
        {isSignup ? /* subhead text */
          "Connect with great local businesses"
        : "New to Whelp?"
        }{isSignup ? null /* button display */
        : <Link className="session-other-choice-link" to='/signup'>Sign Up</Link>}</p>
        <p className="session-form-legal-copy">
        {isSignup ? /* legal copy text */
          "By continuing, you agree to Whelp’s Terms of Service and acknowledge Whelp’s Privacy Policy."
        : "By logging in, you agree to Whelp's Terms of Service and Privacy Policy."
        }</p>
      </div>
    );

    const errorsList = Object.keys(errors).length > 0 ? (
      <div className="session-form-errors-container">
        <div className="session-form-error">
          {Object.values(errors)[0]} <button onClick={() => this.props.clearErrors()}>×</button>
        </div>
      </div>
    ) : null;

    return (
      <div className="session-form-content-container">
      {errorsList}
        <div className="session-form-container">
          <form id={isSignup ? '' : 'login'} className="session-form" onSubmit={this.handleSubmit}>
            {header}
            {isSignup ? (
              <div className="session-form-name-container">
                <input /* first name field display */
                  type="text" 
                  value={this.state.firstName}
                  onChange={this.update('firstName')}
                  placeholder='First Name'
                  required
                />
                <input /* last name field display */
                type="text"
                value={this.state.lastName}
                onChange={this.update('lastName')}
                placeholder='Last Name'
                required
              />
              </div>
            ) : null}
            <input /* email field */
              className={this.state.redBorder ? 'red-border' : null}
              type="email"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder='Email'
              required
              disabled={this.props.formType === 'login' && this.state.submitting}
            />
            <input /* password field */
              className={this.state.redBorder ? 'red-border' : null}
              type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder='Password'
              required
              disabled={this.props.formType === 'login' && this.state.submitting}
            /> {/* add password strength bar later */}
            {isSignup ? /* zipcode field display */
              <input 
                type="text"
                value={this.state.zipCode}
                onChange={this.update('zipCode')}
                placeholder='ZIP Code'
                id="session-form-zip-code"
                required
              /> : null}
            <input /* submit button */
              type="submit"
              value={isSignup ? /* submit button message */
                "Sign Up" : "Log In"}
              className="session-form-submit-button"
            />
            <div className="session-form-subtext-container"> {/* display other choice at bottom of form */}
              <small className="session-form-subtle-text">
                {isSignup ? "Already on Whelp?" : "New to Whelp?"}
                <Link className="session-other-choice-link" to={`/${isSignup ? 'login' : 'signup'}`}>
                  {isSignup ? "Log In" : "Sign Up"} 
                </Link>
              </small>
            </div>
          </form>
          <div className="session-form-picture-container">
            <i className="y-signup-img" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default SessionForm;