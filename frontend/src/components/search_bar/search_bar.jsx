import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './search_bar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      businessQuery: "", 
      location: "" ,
      isSearching: false
    };
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch(e) {
    e.preventDefault();
    this.setState({ isSearching: true });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    if (this.state.isSearching) {
      return <Redirect to={`/businesses/search?q=${this.state.businessQuery}&loc=${this.state.location}`} />;
    }

    return (
      <form className="search-bar-container" onSubmit={this.handleSearch}>
        <div className="search-business-container">
          <span>Find</span>
          <input 
            type="text" 
            placeholder="grooming, Happy Dogs Hotel"
            value={this.state.businessQuery}
            onChange={this.update("businessQuery")} 
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
        <button className="search-icon-container">
          <i className="search-icon"></i>
        </button>
      </form>
    );
  }
}

export default withRouter(SearchBar);