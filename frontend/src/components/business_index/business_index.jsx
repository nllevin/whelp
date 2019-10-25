import React from 'react';
import HeaderNav from '../header_nav/header_nav';
import BusinessIndexItem from './business_index_item';
import './business_index.css';
import '../reset.css';

class BusinessIndex extends React.Component {
  componentDidMount() {
    this.props.fetchBusinesses();                                               // will change for search/filters
  }

  render() {
    const { businesses } = this.props;
    if (!businesses) return null;

    return (
      <div className="business-index-container">
        <HeaderNav />
        <div className="business-index-content-container">
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
          <aside className="business-index-sidebar">
            <span>map and ads go here</span>
          </aside>
        </div>
      </div>
    );
  }
}

export default BusinessIndex;