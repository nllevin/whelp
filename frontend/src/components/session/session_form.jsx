import React from 'react';

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
        : <b>Sign Up</b>}</p>
        <p className="legal-copy">
        {isSignup ? /* legal copy text */
          "By continuing, you agree to Yelp’s Terms of Service and acknowledge Yelp’s Privacy Policy."
        : "By logging in, you agree to Whelp's Terms of Service and Privacy Policy."
        }</p>
      </div>
    );

    const errorsList = (
      <div className="session-form-errors-container">
        <ul className="session-form-errors-list">
          {errors.map((error, idx) => 
            <li key={`session-error-${idx}`}>{error}</li>)}
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
              required
            /> : null}
          {isSignup ? /* last name field display */
            <input
              type="text"
              value={this.state.lastName}
              onChange={this.update('lastName')}
              required
            /> : null}
          <input /* email field */
            type="email"
            value={this.state.email}
            onChange={this.update('email')}
            required
          />
          <input /* password field */
            type="password"
            value={this.state.password}
            onChange={this.update('password')}
            required
          /> {/* add password strength bar later */}
          {isSignup ? /* zipcode field display */
            <input 
              type="text"
              value={this.state.zipCode}
              onChange={this.update('zipCode')}
              required
            /> : null}
          <input /* submit button */
            type="submit"
            value={isSignup ? "Sign Up" : "Log In"}
          />
        </form>
      </div>
    )
  }
}

export default SessionForm;