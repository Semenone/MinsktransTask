import './App.css';
import Service from './service';
import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
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
    const routes = this.state.routes;
    const stops = this.state.stops;

    return(
        <div>

           <MapComponent mainRouteStops={this.state.mainRouteStops} stops={stops}/>

            <div style={{position: 'fixed'}} className="list-item">
              {
                routes.map((item) => {
                  return (
                  <div style={{margin: '5px'}} onClick= { () => {
                    this.setState({mainRouteStops: item.routeStops})
                }}>
                    <p className="stop-item">{item.routeNum} - {item.routeName}</p>
                  </div>)
                })
              }

            </div>
        </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (`??`)
})(App)
