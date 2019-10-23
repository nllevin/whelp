import React from 'react';
import './search_bar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { business: "", location: "" }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          location: `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`              // use Geocoding API here
        });
      });
    } else {
      this.setState({
        location: "San Francisco, CA"
      });
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    return (
      <div className="search-bar-container">
        <div className="search-business-container">
          <span>Find</span>
          <input 
            type="text" 
            placeholder="grooming, Happy Dogs Hotel"
            onChange={this.update("business")} 
          />
        </div>
        <div className="search-location-container">
          <span>Near</span>
          <input 
            type="text" 
            value={this.state.location}
            onChange={this.update("location")} 
          />
        </div>
        <div className="search-icon-container">
          <i className="search-icon"></i>
        </div>
      </div>
    );
  }
}

export default SearchBar;