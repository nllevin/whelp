import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from "./profile_dropdown";
import './greeting.css';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false };
    this.closeDropdown = this.closeDropdown.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  closeDropdown() {
    this.setState({ dropdownOpen: false });
  }

  toggleDropdown(e) {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  render() {
    const { currentUser, logout } = this.props;

    const loggedOutGreeting = (
      <div className="greeting-container">
        <Link to="/login" className="session-button">Log In</Link>
        <Link to="/signup" className="session-button">Sign Up</Link>
      </div>
    );

    const loggedInGreeting = (
      <div className="greeting-container">
        <button className="profile-dropdown-button" onClick={this.toggleDropdown}>
          {
            currentUser && currentUser.avatarUrl ?
              <img className="profile-avatar" src={currentUser.avatarUrl} alt="profile avatar"/>
              : <i className="profile-avatar"></i>
          }
          <span className="profile-down-arrow"></span>
        </button>
        {
          this.state.dropdownOpen ? 
          <ProfileDropdown
            currentUser={currentUser}
            logout={logout}
            toggleDropdown={this.toggleDropdown}
            closeDropdown={this.closeDropdown}
          /> : ""
        }
      </div>
    );

    return currentUser ? loggedInGreeting : loggedOutGreeting;
  }
}

export default Greeting;