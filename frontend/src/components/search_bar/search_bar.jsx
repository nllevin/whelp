import React from 'react';
import { withRouter } from 'react-router-dom';
import './search_bar.css';
const APIKey = require('../../config/keys').googleAPI;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    let businessQuery = "";
    let locationQuery = "New York, New York";
    if (this.props.location.search) {
      const searchParams = new URLSearchParams(this.props.location.search);
      businessQuery = searchParams.get("q");
      locationQuery = searchParams.get("loc");
    }

    if (!window.google && this.props.onSplash) {
      this.state = { 
        isLoadingScript: true,
        businessQuery,
        locationQuery
      };
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${APIKey}`;
      script.addEventListener('load', () => this.setState({
        isLoadingScript: false
      }));
      document.head.append(script);
    } else {
      this.state = {
        isLoadingScript: false,
        businessQuery,
        locationQuery
      };
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    const { businessQuery, locationQuery } = this.state;
    this.props.history.push(`/businesses/search?q=${businessQuery}&loc=${locationQuery}`);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    if (this.state.isLoadingScript) return null;

    const { businessQuery, locationQuery } = this.state;
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
            value={locationQuery}
            onChange={this.update("locationQuery")} 
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