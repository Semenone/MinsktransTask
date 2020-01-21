import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapComponent extends Component  {
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    componentDidUpdate(prevProps) {
        if (this.props.mainRouteStops !== prevProps.mainRouteStops) {
            this.setState({showingInfoWindow : false})
        }
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
    
    render() {
        const {mainRouteStops, stops, google} = this.props;

        return (
            <Map google={google}
            style={{ position: 'fixed',
            float:' right',
            height: '100%',
            width: '50%' }}
        initialCenter={{
            lat: 53.9045326,
            lng: 27.5744375}}
        className={'map'}
        zoom={14}
                onClick={this.onMapClicked} >
                {mainRouteStops.map(e => {
                    if (!!stops.find(item => item.stopId === e)) {
                        const currentItem = stops.find(item => item.stopId === e);
                    return (
                    <Marker
                        onClick={this.onMarkerClick}
                        name={currentItem.stopName}
                        position={{lat: currentItem.stopLat/100000 ,
                        lng: currentItem.stopLng/100000}}
                    />
                        )
                    }
                    })}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
            </Map>
        )
    }
};

export default GoogleApiWrapper({
    apiKey: (`AIzaSyDoz5Rf0g5Xq5AFpqSSEpZAQqtzVgeyo7M`)
})(MapComponent)