import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

function FireMapAppData() {

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
          console.log(error)
          setHasError(error)
          setIsLoading(false);

        }
      );


  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (hasError) {
    console.log(hasError)
    return <p>An error has occurred.  Please try again.</p>
  }

  const fireId = fires._id;
  console.log({fireId})

  return (
    <main>
      <div class="map container2" >
        <h1 class="map-text">The Fire Map goes here</h1>
        {fires.map((fire, id) =>
          
          <section className="row card" key={id} >
            <div className="list">
              <div className="column list-info">
                <h2>Fire Name:{fire.incident_name}</h2>
                <p>Latitude:{fire.location.latitude}</p>
                <p>Longitude:{fire.location.longitude}</p>
                <p>City:{fire.location.city}</p>
                <p>County:{fire.location.county}</p>
                <p>State:{fire.location.state}</p>
                <p>Date/Time Discovered:{fire.fire_discovery_datetime}</p>
                <p>Containment Date:{fire.containment_datetime}</p>
                <p>Control Date:{fire.control_datetime}</p>
                <p>Fire Out Date:{fire.fire_out_datetime}</p>
                <p>Containment Date:{fire.containment_datetime}</p>
                <p>Daily Acres:{fire.daily_acres}</p>
                <p>Total Acres:{fire.total_acres}</p>
                <p>Cause:{fire.fire_origin.cause}</p>
                <p>Total Acres:{fire.total_acres}</p>
                <p>Cost:{fire.estimated_cost_to_date}</p>

                <Link to={`/createmessage/${fire._id}`}><button>Return to Map</button></Link>
               <Link to={`/`}><button>Return to Map</button></Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
    

  )
}
export default FireMapAppData