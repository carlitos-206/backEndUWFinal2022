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
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (hasError) {
    return <p>An error has occurred.  Please try again.</p>
  }
  console.log(fires)
  return <Map places={fires} center={{ lat: 47.444, lng: -120.021 }} />;
}


export default FireMapApp;