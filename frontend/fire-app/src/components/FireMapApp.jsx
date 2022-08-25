import React, { useEffect, useState } from 'react';

import Map from "./Map";

import "../App.css";

// const fires = [
//   {
//     name: "Hat Top",
//     title: "Hat Top",
//     cause: "Lightning",
//     totalAcres: 1200,
//     totalCost: 1300000,
//     lat: 47.053,
//     lng: -122.453,
//     id: 1
//   },
//   {
//     name: "Wagner Road",
//     title: "Wagner Road",
//     cause: "Unknown",
//     totalAcres: 7381,
//     totalCost: 3000000,
//     lat: 47.025,
//     lng: -120.021,
//     id: 2
//   },
//   {
//     name: "Camel Hump",
//     title: "Camel Hump",
//     cause: "Lightning",
//     totalAcres: 1500,
//     totalCost: 1000000,
//     lat: 47.630,
//     lng: -122.143,
//     id: 3
//   }
// ];

function FireMapApp() {
  const [fires, setFires] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/fires/')

      .then(response => response.json())

      .then(
        data => {
          setFires(data);
          setIsLoading(false);
        },

        error => {
          setHasError(true)
          setIsLoading(false);

        }
      );


  }, []);
  console.log(fires)
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (hasError) {
    return <p>An error has occurred.  Please try again.</p>
  }
  for(let i = 0; i < fires.length; i++){
    // containment_datetime: "2014-08-24T18:59:59Z"
    // control_datetime: "2014-08-24T19:01:00Z"
    // created_on_datetime: "2014-08-29T01:20:27Z"
    // daily_acres: 0.1
    // discovery_acres: null
    // estimated_cost_to_date: null
    // final_fire_report_approved_date: null
    // fire_discovery_datetime: "2014-07-17T20:07:59Z"
    // fire_origin:
    // cause: "Natural"
    // general: null
    // specific: null
    // [[Prototype]]: Object
    // fire_out_datetime: "2014-08-28T18:59:59Z"
    // incident_name: "DUNCAN HILL 2-ENTIAT"
    // location:
    // city: null
    // county: "Chelan"
    // latitude: null
    // longitude: null
    // state: "US-WA"
    // [[Prototype]]: Object
    // modified_by_system: "wfdss"
    // modified_on_datetime: "2014-08-29T18:46:06Z"
    // predominant_fuel_group: null
    // source: "IRWIN"
    // total_acres: null
    // _id: "62fb42131c5b7ea309f7e0e0"
    // if(fires.containment_datetime[i] == null){
    //   fires.containment_datetime[i] = "N/A"
    // }
    // if(fires.control_datetime[i] == null){
    //   fires.control_datetime[i] = "N/A"
    // }
    // if(fires.created_on_datetime[i] == null){
    //   fires.created_on_datetime[i] = "N/A"
    // }
  }
  return <Map places={fires} center={{ lat: 47.444, lng: -120.021 }} />;
}


export default FireMapApp;