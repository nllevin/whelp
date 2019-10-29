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
    if (!window.google) {
      this.state = { 
        isLoadingScript: true,
        isMounting: true,
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
        isMounting: true,
        isFetchingCoords: true,
        badLocQuery: false,
        lat: "",
        lng: ""
      };
    }
  }

  componentDidMount() {
    if (window.google) {
      this.fetchCoordsFromLoc(
        (new URLSearchParams(this.props.location.search)).get("loc")
      );
    }

    this.props.searchBusinesses(this.props.location.search)
      .then(() => this.setState({ isMounting: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoadingScript && !this.state.isLoadingScript) {
      this.fetchCoordsFromLoc(
        (new URLSearchParams(this.props.location.search)).get("loc")
      );
    }

    if (this.props.location.search !== prevProps.location.search) {
      const newSearchParams = new URLSearchParams(this.props.location.search);
      const oldSearchParams = new URLSearchParams(prevProps.location.search);

      if (newSearchParams.get("q") !== oldSearchParams.get("q")) {
        this.props.searchBusinesses(this.props.location.search);
      }

      if (newSearchParams.get("loc") !== oldSearchParams.get("loc")) {
        this.setState({ isFetchingCoords: true });
        this.fetchCoordsFromLoc(newSearchParams.get("loc"));
      }
    }
  }

  fetchCoordsFromLoc(loc) {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: loc }, (res, status) => {
      if (status === "ZERO_RESULTS") {
        this.setState({
          isFetchingCoords: false,
          badLocQuery: loc,
          lat: "",
          lng: ""
        });
      } else {
        const pos = res[0].geometry.location;
        this.setState({
          isFetchingCoords: false,
          badLocQuery: false,
          lat: pos.lat(),
          lng: pos.lng()
        });
      }
    });
  }

  render() {
    if (this.state.isMounting || this.state.isLoadingScript || this.state.isFetchingCoords) {
      return null;
    }

    const { businesses, history } = this.props;
    const { lat, lng, badLocQuery } = this.state;
    const searchParams = new URLSearchParams(this.props.location.search);
    const queryWords = searchParams.get("q").toLowerCase().split(" ");

    const noResultsDisplay = (
        <div className="business-index-content no-search-results">
          <h4>Suggestions for improving the results:</h4>
          <p>Try a different location.</p>
          <p>Check the spelling or try alternate spellings.</p>
          <p>Try a more general search, e.g. "pizza" instead of "pepperoni".</p>
        </div>
    );
    
    const resultsDisplay = (
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
                {businesses.length === 0 ? noResultsDisplay : resultsDisplay}
                <aside className="business-index-sidebar">
                  <SearchMap 
                    businesses={businesses}
                    lat={lat}
                    lng={lng}
                    history={history}
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