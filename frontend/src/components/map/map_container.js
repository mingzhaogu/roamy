import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import {connect} from 'react-redux';
import GMap from './gmap';
import { sendQuery } from '../../actions/discover_actions';

const gAPI = require('../../config/keys').gAPI;

/* Connecting Map to State Shape*/
const mapStateToProps = (state, ownProps) => ({
    userId: state.session.id
});

const mapDispatchToProps = (dispatch) => ({
    // track: (location) => dispatch(track(location))
    sendQuery: (query) => dispatch(sendQuery(query))
});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(GMap);

/* Wrappe MapContainer with Google API*/
export default GoogleApiWrapper({
  apiKey: (gAPI)
})(MapContainer)