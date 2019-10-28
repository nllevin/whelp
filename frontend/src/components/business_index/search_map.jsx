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

    this.markers = {};
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
      this.updateMarkers();
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
        lat: parseFloat(lat), 
        lng: parseFloat(lng) 
      },
      disableDefaultUI: true,
      gestureHandling: "cooperative",
      keyboardShortcuts: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      zoom: 9
    };
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.updateMarkers();
  }

  createMarker(business, idx) {
    const google = window.google;
    const pos = new google.maps.LatLng(business.lat, business.lng);
    const imgUrl = `data:image/svg+xml;charset=UTF-8,%0A%20%20%20%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%225%20-2%2027%2036%22%20width%3D%2226%22%20height%3D%2236%22%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22rgba(211%2C%2035%2C%2035%2C%201)%22%20d%3D%22M26%2C7.64A11.25%2C11.25%2C0%2C0%2C0%2C10%2C23.56L18%2C31.5l8.27-8.27A11.24%2C11.24%2C0%2C0%2C0%2C26%2C7.64Z%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22rgba(141%2C%200%2C%205%2C%201)%22%20d%3D%22M18%2C32.21%2C9.69%2C23.91A11.75%2C11.75%2C0%2C1%2C1%2C26.31%2C7.29h0a11.71%2C11.71%2C0%2C0%2C1%2C.31%2C16.28ZM18%2C4.85a10.75%2C10.75%2C0%2C0%2C0-7.6%2C18.36L18%2C30.79l7.92-7.92A10.71%2C10.71%2C0%2C0%2C0%2C25.61%2C8h0A10.68%2C10.68%2C0%2C0%2C0%2C18%2C4.85Z%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ctext%20x%3D%2218%22%20y%3D%2222%22%20font-family%3D%22Helvetica%2CArial%2Csans-serif%22%20font-size%3D%2216%22%20fill%3D%22rgba(255%2C%20255%2C%20255%2C%201)%22%20text-anchor%3D%22middle%22%3E${idx + 1}%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A`;
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      icon: imgUrl
    });
    marker.addListener('click', () => {
      this.props.history.push(`/businesses/${business._id}`);
    });
    marker.addListener('mouseover', () => {
      marker.setIcon(`data:image/svg+xml;charset=UTF-8,%0A%20%20%20%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%225%20-2%2027%2036%22%20width%3D%2226%22%20height%3D%2236%22%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22rgba(255%2C%20255%2C%20255%2C%201)%22%20d%3D%22M26%2C7.64A11.25%2C11.25%2C0%2C0%2C0%2C10%2C23.56L18%2C31.5l8.27-8.27A11.24%2C11.24%2C0%2C0%2C0%2C26%2C7.64Z%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22rgba(141%2C%200%2C%205%2C%201)%22%20d%3D%22M18%2C32.21%2C9.69%2C23.91A11.75%2C11.75%2C0%2C1%2C1%2C26.31%2C7.29h0a11.71%2C11.71%2C0%2C0%2C1%2C.31%2C16.28ZM18%2C4.85a10.75%2C10.75%2C0%2C0%2C0-7.6%2C18.36L18%2C30.79l7.92-7.92A10.71%2C10.71%2C0%2C0%2C0%2C25.61%2C8h0A10.68%2C10.68%2C0%2C0%2C0%2C18%2C4.85Z%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ctext%20x%3D%2218%22%20y%3D%2222%22%20font-family%3D%22Helvetica%2CArial%2Csans-serif%22%20font-size%3D%2216%22%20fill%3D%22rgba(211%2C%2035%2C%2035%2C%201)%22%20text-anchor%3D%22middle%22%3E${idx + 1}%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A`)
    });
    marker.addListener('mouseout', () => {
      marker.setIcon(`data:image/svg+xml;charset=UTF-8,%0A%20%20%20%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%225%20-2%2027%2036%22%20width%3D%2226%22%20height%3D%2236%22%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22rgba(211%2C%2035%2C%2035%2C%201)%22%20d%3D%22M26%2C7.64A11.25%2C11.25%2C0%2C0%2C0%2C10%2C23.56L18%2C31.5l8.27-8.27A11.24%2C11.24%2C0%2C0%2C0%2C26%2C7.64Z%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22rgba(141%2C%200%2C%205%2C%201)%22%20d%3D%22M18%2C32.21%2C9.69%2C23.91A11.75%2C11.75%2C0%2C1%2C1%2C26.31%2C7.29h0a11.71%2C11.71%2C0%2C0%2C1%2C.31%2C16.28ZM18%2C4.85a10.75%2C10.75%2C0%2C0%2C0-7.6%2C18.36L18%2C30.79l7.92-7.92A10.71%2C10.71%2C0%2C0%2C0%2C25.61%2C8h0A10.68%2C10.68%2C0%2C0%2C0%2C18%2C4.85Z%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ctext%20x%3D%2218%22%20y%3D%2222%22%20font-family%3D%22Helvetica%2CArial%2Csans-serif%22%20font-size%3D%2216%22%20fill%3D%22rgba(255%2C%20255%2C%20255%2C%201)%22%20text-anchor%3D%22middle%22%3E${idx + 1}%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A`);
    });
    this.markers[business._id] = marker;
  }

  updateMarkers() {
    const businesses = {};
    this.props.businesses.forEach((business, idx) => {
      businesses[business._id] = business;
      if (!this.markers[business._id]) {
        this.createMarker(business, idx);
      }
    });
    Object.keys(this.markers).forEach(businessId => {
      if (!businesses[businessId]) {
        this.markers[businessId].setMap(null);
        delete this.markers[businessId];
      }
    });
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