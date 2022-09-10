import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
const axios = require('axios')

function Hamburger() {
  const handleClick = async (e) => {
    e.preventDefault();
    let local = localStorage.getItem('loginData')
    let localObj = JSON.parse(local)
    if (window.confirm("Do you really want to delete your account?")) {
      axios.delete(`https://uw-api-2022.herokuapp.com/users/delete/${localObj.username}`)
      .then(localStorage.clear(), location.reload())
      .catch(error=> alert(error))
    }
}


    return (
        <section className="p-menu1">
        {/* <nav id="navbar" className="navigation" role="navigation"> */}
          <input id="toggle1" type="checkbox" />
          <label className="hamburger1" htmlFor="toggle1">
            <div className="top"></div>
            <div className="meat"></div>
            <div className="bottom"></div>
          </label>
          <div className="menu1">
            <button onClick={(e) => handleClick(e)} className="link1"> Delete Account</button>
          </div>
      {/* </nav> */}
      </section>
    )

}

export default Hamburger