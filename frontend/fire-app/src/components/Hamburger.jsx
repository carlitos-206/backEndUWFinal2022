import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


function Hamburger() {

    return (
        <section className="p-menu1">
        {/* <nav id="navbar" className="navigation" role="navigation"> */}
          <input id="toggle1" type="checkbox" />
          <label className="hamburger1" for="toggle1">
            <div className="top"></div>
            <div className="meat"></div>
            <div className="bottom"></div>
          </label>
        
          <div class="menu1">
            <a className="link1" href="">Delete User Account</a>
          </div>
      {/* </nav> */}
      </section>
    )

}

export default Hamburger