import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderNav from '../header_nav/header_nav';
import BusinessIndexItem from './business_index_item';
import SearchMap from './search_map';
import './business_index.css';
import '../reset.css';

class BusinessIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isMounting: true,
      badLocQuery: false
    };
    this.setBadLocQuery = this.setBadLocQuery.bind(this);
  }

  componentDidMount() {
    this.props.searchBusinesses(this.props.location.search)
      .then(() => this.setState({ isMounting: false }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ badLocQuery: false });
      this.props.searchBusinesses(this.props.location.search);
    }
  }

  setBadLocQuery(badLocQuery) {
    this.setState({ badLocQuery });
  }

  render() {
    if (this.state.isMounting) return null;

    const { businesses, history } = this.props;
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
          this.state.badLocQuery ? 
            badLocMessage : (
              <div className="business-index-content-container">
                {businesses.length === 0 ? noResultsDisplay : resultsDisplay}
                <aside className="business-index-sidebar">
                  <SearchMap 
                    businesses={businesses}
                    loc={searchParams.get("loc")}
                    setBadLocQuery={this.setBadLocQuery}
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