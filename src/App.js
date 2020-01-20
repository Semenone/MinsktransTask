import './App.css';
import Service from './service';
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, google, maps} from 'google-maps-react';
import MapComponent from "./MapComponent";



const service = new Service();

class App extends Component{

  state = {
    stops: [],
    routes: [],
    mainRouteStops: []
  }


  componentDidMount() {
    service.getStops()
        .then(e => {
          this.setState({stops: e})
        })

    service.getRoutes()
        .then(e => {
          this.setState({routes: e})
        })
  }

  render(){
//    const stops = this.state.stops
    const routes = this.state.routes;
    const stops = this.state.stops;
    // console.log(routes)

    return(
        <div>
        <MapComponent mainRouteStops={this.state.mainRouteStops} stops={stops}/>
          <p style={{ position: 'fixed',
            float:'left',
            height: '100%',
            width: '50%',
            overflow: 'scroll' }}
          >{
            routes.map(e => {
              return (
                  <div onClick= { () => {
                      this.setState({mainRouteStops: e.routeStops})
                  }}>
                    {e.routeNum} - {e.routeName}
                  </div>)
            })
          }</p>
        </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (`AIzaSyDoz5Rf0g5Xq5AFpqSSEpZAQqtzVgeyo7M`)
})(App)
