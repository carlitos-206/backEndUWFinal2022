import React from 'react';
import { Link } from 'react-router-dom';

// import { Link  } from 'react-router-dom';

function Banner() {
    return (
      <Link to = {'/'}>
        <div className="App-header">
          <h1>
            Washington Wildfires Community
          </h1>
       </div>
      </Link>
    );
  }

export default Banner