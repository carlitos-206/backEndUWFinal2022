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

                            //This code locates the pin on the map based on the latitude and longitude
                            <Marker
                                onClick={this.onMarkerClick}
                                key={place.id}
                                place_={place}
                                position={{ lat: place.location.latitude, lng: place.location.longitude }}
                            />
                        );
                    })}
                    <InfoWindowEx

                    // This code creates the pop up and inserts the div information into the pop up
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h3>Name: {this.state.selectedPlace.incident_name}</h3>
                            {/* <p>Cause: {this.state.selectedPlace.fire_origin.o}</p> */}
                            <p>Total Acres: {this.state.selectedPlace.total_acres}</p>
                            <p>Total Cost: {this.state.selectedPlace.estimated_cost_to_date}</p>
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