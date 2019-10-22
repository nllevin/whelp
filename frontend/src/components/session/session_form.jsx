import React from "react";
import { withRouter } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      zipCode: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const { errors, formType } = this.props;
    const isSignup = formType === "signup";
    const header = (
      <div className="header">
        <h2>
        {isSignup ? /* header text */
          "Sign Up for Whelp"
        : "Log In to Whelp"
        }</h2>
        <p className="subheading">
        {isSignup ? /* subhead text */
          "Connect with great local businesses"
        : "New to Whelp?"
        }{isSignup ? null /* button display */
        : <b onClick={() => this.props.history.push('/signup')}>Sign Up</b>}</p>
        <p className="legal-copy">
        {isSignup ? /* legal copy text */
          "By continuing, you agree to Whelp’s Terms of Service and acknowledge Whelp’s Privacy Policy."
        : "By logging in, you agree to Whelp's Terms of Service and Privacy Policy."
        }</p>
      </div>
    );

    const errorsList = (
      <div className="session-form-errors-container">
        <ul className="session-form-errors-list">
          {errors.map((error, idx) => 
            <li key={`session-error-${idx}`} className={isSignup ? "signup-error" : "login-error"}>
              {error} <b onClick={() => this.props.clearErrors()}>X</b>
            </li>)}
        </ul>
      </div>
    )

    return (
      <div className="session-form-container">
        {errorsList}
        {header}
        <form onSubmit={this.handleSubmit}>
          {isSignup ? /* first name field display */
            <input 
              type="text" 
              value={this.state.firstName}
              onChange={this.update('firstName')}
              placeholder='First Name'
              required
            /> : null}
          {isSignup ? /* last name field display */
            <input
              type="text"
              value={this.state.lastName}
              onChange={this.update('lastName')}
              placeholder='Last Name'
              required
            /> : null}
          <input /* email field */
            type="email"
            value={this.state.email}
            onChange={this.update('email')}
            placeholder='Email'
            required
          />
          <input /* password field */
            type="password"
            value={this.state.password}
            onChange={this.update('password')}
            placeholder='Password'
            required
          /> {/* add password strength bar later */}
          {isSignup ? /* zipcode field display */
            <input 
              type="text"
              value={this.state.zipCode}
              onChange={this.update('zipCode')}
              placeholder='ZIP Code'
              required
            /> : null}
          <input /* submit button */
            type="submit"
            value={isSignup ? /* submit button message */
              "Sign Up" : "Log In"}
          />
        </form>
        <div className="session-form-subtext-container"> {/* display other choice at bottom of form */}
          <small className="session-form-subtle-text">
            {isSignup ? "Already on Whelp?" : "New to Whelp?"}
            <b onClick={() => this.props.history.push(`/${isSignup ? 'login' : 'signup'}`)}>
              {isSignup ? "Log In" : "Sign Up"} 
            </b>
          </small>
        </div>
      </div>
    )
  }
}

export default withRouter(SessionForm);