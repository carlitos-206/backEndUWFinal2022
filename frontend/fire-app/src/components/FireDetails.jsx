import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import checkVal from './logic/checkVal';
import readTheDate from './logic/readTheDate';
import totalAcres from './logic/totalAcres';
// import convertToUSD from './logic/converToUSD';
function FireDetails({ fireId  }) {
    const [fire, setFire] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetch(`https://uw-api-2022.herokuapp.com/fires/${fireId}`)
        .then(response => response.json())
        .then(
            data => {
                setFire(data);
                setIsLoading(false);
            },
            error => {
                setHasError(true)
                setIsLoading(false);
            }
        );
    }, [fireId]);
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }
    return (
        // return info for each fire
        <div className="container">
            <div className="column list-info">
                <h2>Fire Name:{checkVal(fire.incident_name)}</h2>
                <p>Lattitude:{checkVal(fire.location.latitude)}</p>
                <p>Longitude:{checkVal(fire.location.longitude)}</p>
                <p>City:{checkVal(fire.location.city)}</p>
                <p>County: {checkVal(fire.location.county)}</p>
                <p>State:{checkVal(fire.location.state)}</p>
                <p>Discovered:{readTheDate(fire.fire_discovery_datetime)}</p>
                <p>Contained:{readTheDate(fire.containment_datetime)}</p>
                <p>Controlled:{readTheDate(fire.control_datetime)}</p>
                <p>Fire Out Date:{readTheDate(fire.fire_out_datetime)}</p>
                <p>Daily Acres:{checkVal(fire.daily_acres)}</p>
                <p>Total Acres:{totalAcres(fire.containment_datetime, fire.control_datetime, fire.daily_acres, fire.total_acres)}</p>
                <p>Cause:{checkVal(fire.fire_origin.cause)} Activity</p>
                <p>Predominant Fuel: {checkVal(fire.predominant_fuel_group)} </p>
                <p>Cost:{fire.estimated_cost_to_date}</p>
                <p>Source: {checkVal(fire.source)}</p>
            </div>
            <a href="/">Return Home</a>
        </div>
    )
}
FireDetails.propTypes = {
    fireId: PropTypes.string.isRequired,

}

export default FireDetails