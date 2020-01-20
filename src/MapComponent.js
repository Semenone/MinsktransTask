import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, google, maps} from 'google-maps-react';

const MapComponent = ({mainRouteStops, stops, google}) => {
    // console.log(mainRouteStops);
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
             zoom={14}>
            {mainRouteStops.map(e => {
                if (!!stops.find(item => item.stopId === e)) {
                return (<Marker
                    title={stops.find(item => item.stopId === e).stopName}
                    position={{lat: (stops.find(item => item.stopId === e).stopLat/100000) ,
                        lng: (stops.find(item => item.stopId === e).stopLng/100000)}} />)
                }
                })}
            <Marker
                // onMouseover={this.onMouseoverMarker}
                    name={'Current location'}
                    position={{lat: 53.9065326,
                        lng: 27.5784375}} />
        </Map>
    )
};

export default GoogleApiWrapper({
    apiKey: (`AIzaSyDoz5Rf0g5Xq5AFpqSSEpZAQqtzVgeyo7M`)
})(MapComponent)