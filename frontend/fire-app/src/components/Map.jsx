import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "./InfoWindowEx";

const mapStyles = {
    width: '80%',
    height: '80%',
  };

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props.place_,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    showDetails = place => {
        console.log(place);
    };

    render() {
        return (
            <div className="map-container">
                <Map
                    google={this.props.google}
                    className={"map"}
                    zoom={7}
                    style={mapStyles}
                    initialCenter={this.props.center}
                >
                    {this.props.places.map((place, i) => {
                        return (
                            <Marker
                                onClick={this.onMarkerClick}
                                key={place.id}
                                place_={place}
                                position={{ lat: place.lat, lng: place.lng }}
                            />
                        );
                    })}
                    <InfoWindowEx
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h3>{this.state.selectedPlace.name}</h3>
                            <p>Cause: {this.state.selectedPlace.cause}</p>
                            <p>Total Acres: {this.state.selectedPlace.totalAcres}</p>
                            <p>Total Cost: {this.state.selectedPlace.totalCost}</p>
                            {/* <button
                                type="button"
                                onClick={this.showDetails.bind(this, this.state.selectedPlace)}
                            >
                                Show details
                            </button> */}
                        </div>
                    </InfoWindowEx>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDHQkDlgl9IuXfZpZbC_sjsJmljmR9TbI4"
})(MapContainer);