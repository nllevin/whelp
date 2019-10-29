import React from 'react';
import "./profile_dropdown.css";

class ProfileDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
    this.props.closeDropdown();
  }

  handleClick(e) {
    if (this.node.contains(e.target) 
      || e.target.className === "profile-dropdown-button"
      || e.target.className === "profile-avatar"
      || e.target.className === "profile-down-arrow") {
      return;
    }
    this.props.toggleDropdown();
  }

  render () {
    const { currentUser, logout } = this.props;
    return (
      <div className="profile-dropdown-container" ref={node => this.node = node}>
        <div className="profile-dropdown-info-container">
          {
            currentUser && currentUser.avatarUrl ?
            <img className="profile-dropdown-photo" src={currentUser.avatarUrl} alt="profile avatar" />
            : <i className="profile-dropdown-photo"></i>
          }
          <div className="profile-dropdown-info">
            <span>{`${currentUser.firstName} ${currentUser.lastName[0]}.`}</span>
            <span>{currentUser.zipCode}</span>                                      {/* Use Google API to change to city, state */}
          </div>
        </div>
        <button className="logout" onClick={logout}>Log Out</button>
      </div>
    );
  }
};

export default ProfileDropdown;