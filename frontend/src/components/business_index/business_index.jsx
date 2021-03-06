import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderNav from '../header_nav/header_nav';
import BusinessIndexItem from './business_index_item';
import SearchMap from './search_map';
import '../reset.css';
import './business_index.css';
const APIKey = require('../../config/keys').googleAPI;

class BusinessIndex extends React.Component {
  constructor(props) {
    super(props);
    this.triggerSearch = this.triggerSearch.bind(this);
    if (!window.google) {
      this.state = { 
        isLoadingScript: true,
        isSearching: true,
        isFetchingCoords: true,
        badLocQuery: false,
        lat: "",
        lng: ""
      };
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${APIKey}`;
      script.addEventListener('load', () => this.setState({ isLoadingScript: false }));
      document.head.append(script);
    } else {
      this.state = { 
        isLoadingScript: false,
        isSearching: true,
        isFetchingCoords: true,
        badLocQuery: false,
        lat: "",
        lng: ""
      };
    }
  }

  componentDidMount() {
    if (window.google) {
      this.fetchCoordsAndSearch();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.isLoadingScript && !this.state.isLoadingScript)
      || (window.google && this.props.location.search !== prevProps.location.search)
    ) {
      this.setState({ isFetchingCoords: true }, () => {
        this.fetchCoordsAndSearch(prevProps)
      });
    }
  }

  fetchCoordsAndSearch(prevProps = { location: { search: "" } }) {
    const google = window.google;
    const searchParams = new URLSearchParams(this.props.location.search);
    const oldSearchParams = new URLSearchParams(prevProps.location.search);
    if (
      (searchParams.get("loc") !== oldSearchParams.get("loc"))
      || (!this.state.lat || !this.state.lng) 
    ) { 
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: searchParams.get("loc") }, (res, status) => {
        if (status === "ZERO_RESULTS") {
          this.setState({
            isFetchingCoords: false,
            badLocQuery: searchParams.get("loc"),
            lat: "",
            lng: ""
          });
        } else {
          const pos = res[0].geometry.location;
          this.setState({
            isFetchingCoords: false,
            isSearching: true,
            badLocQuery: false,
            lat: pos.lat(),
            lng: pos.lng()
          });
        }
      });
    } else {
      this.triggerSearch();
    }
  }

  triggerSearch(bounds = this.state.bounds) {
    const searchParams = {
      query: (new URLSearchParams(this.props.location.search).get("q")),
      bounds
    };
    this.props.searchBusinesses(searchParams)
      .then(() => this.setState({ 
        isSearching: false, 
        isFetchingCoords: false,
        bounds 
      }));
  }

  render() {
    // debugger;
    if (this.state.isLoadingScript || this.state.isFetchingCoords) return (
      <div>
        <HeaderNav />
        <div className="business-index-content-container"></div>
      </div>
    );

    const { businesses, history } = this.props;
    const { lat, lng, badLocQuery, isSearching } = this.state;
    const searchParams = new URLSearchParams(this.props.location.search);
    const queryWords = searchParams.get("q").toLowerCase().split(" ");

    const noSearchResults = (
        <div className="business-index-content no-search-results">
          <h4>Suggestions for improving the results:</h4>
          <p>Try a different location.</p>
          <p>Check the spelling or try alternate spellings.</p>
          <p>Try a more general search, e.g. "pizza" instead of "pepperoni".</p>
        </div>
    );
    
    const searchResults = (
      <main className="business-index-content">
        <h2>All Results</h2>
        <ul>
          {
            businesses.map((business, idx) => (
              <BusinessIndexItem
                key={business._id}
                idx={idx}
                business={business}
                queryWords={queryWords}
              />
            ))
          }
        </ul>
      </main>
    );

    const resultsDisplay = businesses.length === 0 ? noSearchResults : searchResults;

    const badLocMessage = (
      <div className="bad-loc-msg">
        <h3>Sorry, but we didn't understand the location you entered.</h3>
        <p>We accept locations in the following forms:</p>
        <ul>
          <li>706 Mission St, San Francisco, CA</li>
          <li>San Francisco, CA</li>
          <li>San Francisco, CA 94103</li>
          <li>94103</li>
        </ul>
        <p>Also, it's possible we don't have a listing for {this.state.badLocQuery}. In that case, you should try adding a zip, or try a larger nearby city.</p>
      </div>
    );
    return (
      <div className="business-index-container">
        <HeaderNav />
        {
          badLocQuery ? 
            badLocMessage : (
              <div className="business-index-content-container">
                { isSearching ? <main className="business-index-content"></main> : resultsDisplay }
                <aside className="business-index-sidebar">
                  <SearchMap 
                    businesses={businesses}
                    lat={lat}
                    lng={lng}
                    history={history}
                    triggerSearch={this.triggerSearch}
                    isSearching={isSearching}
                  />
                </aside>
              </div>
            )
        }
      </div>
    );
  }
}

export default withRouter(BusinessIndex);