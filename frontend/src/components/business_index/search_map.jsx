import React from 'react';
import './search_map.css';

class SearchMap extends React.Component {
  constructor(props) {
    super(props);
    this.markers = {};
    this.handleIdle = this.handleIdle.bind(this);
  }

  componentDidMount() {
    this.constructMap();
  }

  componentDidUpdate(prevProps) {
    if (this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng) {
      this.map.setCenter({
        lat: parseFloat(this.props.lat),
        lng: parseFloat(this.props.lng)
      });
    }
    this.updateMarkers();
  }
  
  constructMap() {
    const google = window.google;
    const mapOptions = {
      center: { 
        lat: parseFloat(this.props.lat),
        lng: parseFloat(this.props.lng) 
      },
      disableDefaultUI: true,
      gestureHandling: "cooperative",
      keyboardShortcuts: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      zoom: 11
    };
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.map.addListener("idle", this.handleIdle);
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

  handleIdle() {
    if (this.props.isSearching || true) {               // make live map reload optional later
      const bounds = this.map.getBounds();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();
      this.props.triggerSearch({
        southWest: { lat: southWest.lat(), lng: southWest.lng() },
        northEast: { lat: northEast.lat(), lng: northEast.lng() }
      });
    } 
    this.updateMarkers();
  }

  updateMarkers() {
    this.markers = {};
    this.props.businesses.forEach((business, idx) => {
      this.createMarker(business, idx);
    });
  }

  render() {
    return (
      <div className="search-map-container">
        <header>
          <h3>Search Map</h3>
          {/* <label>                           // make live map reload optional later
            <input type="checkbox"/>
            Redo search when map is moved
          </label> */}
          <label>Drag Map for New Search</label>
        </header>
        <div className="search-map" ref={map => this.mapNode = map}></div>
      </div>
    );
  }
}

export default SearchMap;