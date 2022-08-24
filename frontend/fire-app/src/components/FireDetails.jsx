import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function FireDetails({ fire, _id  }) {
 


    return (
        // return info for each fire
        <div>
            <Popup trigger={<button className="triangle">  </button>}
                position="right center">
                <article className="fire-container">
                    <div className="fire-card" key="id">

                        <section className="row card" key={_id} >
                            <div className="list">
                                <div className="column list-info">
                                    <h2>Fire Name:{fire.incident_name}</h2>
                                    <p>Lattitude:{fire.lattitude}</p>
                                    <p>Longitude:{fire.longitude}</p>
                                    <p>City:{fire.city}</p>
                                    <p>County:{fire.county}</p>
                                    <p>State:{fire.state}</p>
                                    <p>Discovered:{fire.discovery_datetime}</p>
                                    <p>Contained:{fire.containment_datetime}</p>
                                    <p>Controlled:{fire.control_datetime}</p>
                                    <p>Fire Out Date:{fire.fire_out_datetime}</p>
                                    <p>Daily Acres:{fire.daily_acres}</p>
                                    <p>Total Acres:{fire.total_acres}</p>
                                    <p>Cause:{fire.fire_origin_cause}</p>
                                    <p>Cost:{fire.estimated_cost_to_date}</p>

                                </div>
                            </div>
                        </section>

                    </div>
                </article>
            </Popup>
        </div>

    )
}
FireDetails.propTypes = {
    fire: PropTypes.object.isRequired,

}

export default FireDetails