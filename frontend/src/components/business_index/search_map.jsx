import React from 'react';
const APIKey = require('../../config/keys').googleAPI;

class SearchMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMounting: true };
  }

  componentDidMount() {
    debugger;
    const google = window.google;
    const { lat, lng } = this.props;
    const mapOptions = {
      center: { lat, lng },
      zoom: 13
    };
    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  render() {
    debugger;
    return (
      <div className="search-map-container" ref={map => this.mapNode = map}>
        <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${APIKey}`}></script>
      </div>
    );
  }
}

export default SearchMap;