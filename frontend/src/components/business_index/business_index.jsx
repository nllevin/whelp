import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderNav from '../header_nav/header_nav';
import BusinessIndexItem from './business_index_item';
import './business_index.css';
import '../reset.css';

class BusinessIndex extends React.Component {
  componentDidMount() {
    this.props.searchBusinesses(this.props.location.search);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.searchBusinesses(this.props.location.search);
    }
  }

  render() {
    const { businesses } = this.props;
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
              />
            ))
          }
        </ul>
      </main>
    );

    return (
      <div className="business-index-container">
        <HeaderNav />
        <div className="business-index-content-container">
          {businesses.length === 0 ? noResultsDisplay : resultsDisplay}
          <aside className="business-index-sidebar">
            <span>map and ads go here</span>
          </aside>
        </div>
      </div>
    );
  }
}

export default withRouter(BusinessIndex);