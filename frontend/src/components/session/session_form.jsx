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
        : <Link to='/signup'>Sign Up</Link>}</p>
        <p className="session-form-legal-copy">
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
              {error} <button onClick={() => this.props.clearErrors()}>X</button>
            </li>)}
        </ul>
      </div>
    )

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
                <Link to={`/${isSignup ? 'login' : 'signup'}`}>
                  {isSignup ? "Log In" : "Sign Up"} 
                </Link>
              </small>
            </div>
          </form>
          <div className="session-form-picture-container">
            <img src="https://s3-media4.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default SessionForm;