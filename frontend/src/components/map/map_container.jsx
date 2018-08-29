import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React from 'react';
import Point from '../../util/point';
import {track} from '../../util/location_api_util';
import {connect} from 'react-redux';
const gAPI = require('../../config/keys').gAPI;

export class GMap extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        center: {},
        clicked: {},
        clickedMarker: [],
        favoriteMarkers: []
      };
    
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props, map, e) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
        // console.log(e.latLng);
        // console.log('clicked lat:', e.latLng.lat(), e.latLng.lng())
        this.setState({clicked: {lat: e.latLng.lat(), lng: e.latLng.lng()}})
        this.setState({clickedMarker: <Marker onClick={this.onMarkerClick}
            name={'Clicked point'}
            position={{lat: e.latLng.lat(), lng: e.latLng.lng()}} 
        icon={{path: this.props.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale: 5}}/>});
        console.log(this.state.clicked);
       
    };

    trackInput() {
        let trackLocation =  {name:'tracking', lat: this.state.clicked.lat, lng: this.state.clicked.lng, userId: this.props.userId};
        this.props.track(trackLocation);
    }

  render() {

    let lat = 37.7749;
    let lng = -122.4194;
    let minutes = 15;
    let points = [];//Point.initEndPoints(lat,lng,minutes);

    // const triangleCoords = [
    //     {lat: 25.774, lng: -80.190},
    //     {lat: 18.466, lng: -66.118},
    //     {lat: 32.321, lng: -64.757},
    //     // {lat: 25.774, lng: -80.190}
    //   ];

    let goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 1,
        strokeColor: 'gold',
        strokeWeight: 14
      };

      const style = {
        width: '500px',
        height: '500px'
      }

      const markers = [<Marker onClick={this.onMarkerClick}
        name={'Current location'} />,
        <Marker
            onClick = { this.onMarkerClick }
            title = { 'Changing Colors Garage' }
            position = {{ lat: 39.648209, lng: -75.711185 }}
            name = { 'Changing Colors Garage' }
            />,
        <Marker onClick={this.onMarkerClick}
        name={'AA'}
        position={{lat: 37.7990, lng: -122.4014}} />,
    <Marker onClick={this.onMarkerClick}
        name={'YOUR LOCATION!'}
        position={this.state.center}
        icon= {{path: this.props.google.maps.SymbolPath.CIRCLE, scale:10}}
        />];


    let that = this;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            that.setState({center: pos});
        });

        // console.log('userId', this.props.userId);
        // console.log('trackFunction', this.props.track);

        return (
            <div>
                <div style={style}>
                    <Map google={this.props.google}
                    onClick={this.onMapClicked}
                    center={this.state.center}>
                        
                        {markers}
                        {this.state.clickedMarker}

                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <h1>{this.state.selectedPlace.name}</h1>
                            </div>
                        </InfoWindow>

                        <Polygon
                            paths={points}
                            strokeColor="#0000FF"
                            strokeOpacity={0.8}
                            strokeWeight={2}
                            fillColor="#0000FF"
                            fillOpacity={0.35} />
                    </Map>
                    </div>
                </div>
                );
            
    } else {
        return (<div>no location</div>);
    }
  }
}


/* Connecting Map to State Shape*/
const mapStateToProps = (state, ownProps) => ({
    userId: state.session.id
});

const mapDispatchToProps = (dispatch) => ({
    track: (location) => dispatch(track(location))
});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(GMap);

/* Wrappe MapContainer with Google API*/
export default GoogleApiWrapper({
  apiKey: (gAPI)
})(MapContainer)