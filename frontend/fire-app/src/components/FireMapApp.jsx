import React, { useEffect, useState } from 'react';

import Map from "./Map";

import "../App.css";

function FireMapApp() {
  const [fires, setFires] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch('https://uw-api-2022.herokuapp.com/fires/')

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