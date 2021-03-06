import {GoogleApiWrapper} from 'google-maps-react';
import {connect} from 'react-redux';
import GMap from './gmap';
import { sendQuery } from '../../actions/discover_actions';
import '../../styling/header/header.css';
import '../../index.css';
import {getFavoritePoints, trackInput} from '../../actions/location_actions';

const gAPI = require('../../config/keys').gAPI;

/* Connecting Map to State Shape*/
const mapStateToProps = (state, ownProps) => ({
    userId: state.session.id,
    endPoints: state.entities.discoveries.cars,
    locations: state.entities.locations
});

const mapDispatchToProps = (dispatch) => ({
    sendQuery: (query) => dispatch(sendQuery(query)),
    getFavoritePoints: (userId) => dispatch(getFavoritePoints(userId)),
    trackInput: (location) => dispatch(trackInput(location))

});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(GMap);

/* Wrappe MapContainer with Google API*/
export default GoogleApiWrapper({
  apiKey: (gAPI)
})(MapContainer)
