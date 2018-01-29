import React, { Component } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default class TreasureMap extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }
  }

  _addMarker = function(coordinate) {
    var markers = this.state.markers
    markers.push({
      latlng: coordinate,
      title: 'Dig #' + (markers.length + 1),
      description: 'You dug for buried treasure at ' + new Date().toLocaleString(),
    });

    this.setState({ markers });
  }

  render() {
    return (
      <MapView style={{ flex: 1 }}
        initialRegion={{
            latitude: 47.6653897,
            longitude: -122.3374744,
            latitudeDelta: 0.002,
            longitudeDelta: 0.001,
          }}
        mapType='mutedStandard'
        onLongPress={(event) => this._addMarker(event.nativeEvent.coordinate)}>
        {this.state.markers.map((marker, i) => (
          <Marker
            key={i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description} />
        ))}
        <Polyline strokeColor='rgba(255, 0, 0, 0.4)' 
          lineDashPattern={[4, 4]}
          coordinates={this.state.markers.map(m => m.latlng)} />
      </MapView>
    );
  }
}