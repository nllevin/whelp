import React from 'react';
import './search_map.css';
const APIKey = require('../../config/keys').googleAPI;

class SearchMap extends React.Component {
  constructor(props) {
    super(props);
    if (!window.google) {
      this.state = { isLoadingScript: true };
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${APIKey}`;
      script.addEventListener('load', () => this.setState({ 
        isLoadingScript: false,
        hasMap: false
      }));
      document.head.append(script);
    } else {
      this.state = { 
        isLoadingScript: false,
        hasMap: false 
      };
    }
  }

  componentDidMount() {
    if (this.state.isLoadingScript) {
      return;
    } else {
      this.constructMap();
    }
  }

  componentDidUpdate() {
    if (this.state.hasMap) {
      return;
    } else {
      this.constructMap();
    }
  }
  
  constructMap() {
    this.setState({ hasMap: true });
    const google = window.google;
    const { lat, lng } = this.props;
    const mapOptions = {
      center: { 
        lat: parseInt(lat), 
        lng: parseInt(lng) 
      },
      zoom: 13
    };
    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  render() {
    if (this.state.isLoadingScript) return null;

    return (
      <div className="search-map-container" ref={map => this.mapNode = map}>
      </div>
    );
  }
}

export default SearchMap;