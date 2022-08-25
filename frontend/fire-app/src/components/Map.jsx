import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "./InfoWindowEx";
import readTheDate from "./logic/readTheDate";

const mapStyles = {
    width: '85%',
    height: '75%',
};


const readAboutFire = (id) =>{
    return `/map/${id}`
}
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
                            <h2>{this.state.selectedPlace.incident_name}</h2>
                            <br/>
                            <p>{readTheDate(this.state.selectedPlace.fire_discovery_datetime)}</p>
                            <br/>
                            <a href={readAboutFire(this.state.selectedPlace._id)}> Read More</a>
                            <br/>
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