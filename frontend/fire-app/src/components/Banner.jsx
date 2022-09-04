import React from 'react';
import { Link } from 'react-router-dom';

// import { Link  } from 'react-router-dom';

function Banner() {
    return (
      <Link to = {'/'}>
        <header>
          <div className="App-header">
            <h1>
              Washington Wildfires Community
            </h1>
          </div>
        </header>
      </Link>
    );
  }

export default Banner