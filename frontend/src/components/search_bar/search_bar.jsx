import React from 'react';
import { withRouter } from 'react-router-dom';
import './search_bar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      businessQuery: "", 
      lat: "",
      lng: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude, 
          lng: position.coords.longitude              // use Geocoding API here
        });
      });
    } else {
      this.setState({
        lat: 40.7128,
        lng: -74.0060
      });
    }
  }

  handleSearch(e) {
    e.preventDefault();
    const { businessQuery, lat, lng } = this.state;
    this.props.history.push(`/businesses/search?q=${businessQuery}&lat=${lat}&lng=${lng}`);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const { businessQuery, lat, lng } = this.state;
    return (
      <form className="search-bar-container" onSubmit={this.handleSearch}>
        <label className="search-business-container">
          <span>Find</span>
          <input 
            type="text" 
            placeholder="grooming, Happy Dogs Hotel"
            value={businessQuery}
            onChange={this.update("businessQuery")} 
          />
        </label>
        <label className="search-location-container">
          <span>Near</span>
          <input 
            type="text" 
            value={`Lat: ${lat}, long: ${lng}`}
            onChange={this.update("location")} 
          />
        </label>
        <button className="search-icon-container">
          <i className="search-icon"></i>
        </button>
      </form>
    );
  }
}

export default withRouter(SearchBar);