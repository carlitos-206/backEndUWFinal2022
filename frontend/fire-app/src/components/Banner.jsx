import React from 'react';
import { Link } from 'react-router-dom';

function Banner() {
    return (
      <Link to="/">
        <header>
            <h1>
              Washington Wildfires Community
            </h1>
        </header>
      </Link>
    );
  }

export default Banner