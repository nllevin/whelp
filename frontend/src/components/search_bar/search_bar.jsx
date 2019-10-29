import React from 'react';
import { withRouter } from 'react-router-dom';
import './search_bar.css';

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

    this.state = { 
      businessQuery,
      locationQuery
    };

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