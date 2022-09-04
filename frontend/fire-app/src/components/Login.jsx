import React from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Banner from './Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
const axios = require('axios')
function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) =>{
    e.preventDefault()
    let username = document.forms.logInForm.fieldOne.value
    let pass = document.forms.logInForm.fieldTwo.value
    axios.post('https://uw-api-2022.herokuapp.com/users/login', {usernameOrEmail: username, password: pass})
    .then(response =>{
      if (response.data.token !== '' || response.data.token !== null) {
        const loginData = response.data
        localStorage.setItem("authenticated", true);
        localStorage.setItem("loginData", JSON.stringify(loginData));
        navigate("/")
      }else{

      console.log(response, 'here')
    }
  })
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      if(error.response.data){
        alert('Wrong information, please try again.')
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
    // .then(data => console.log(data) )
  }
    return (
      <section className="login">
        <Banner />
        <div className="login-form card">
          <div className="card-header">
            <h2>Login</h2> 
            <Link to={`/`}>
              <button>
                <FontAwesomeIcon icon={solid('x')} />
              </button>
            </Link>
          </div>
          <form id='logInForm' onSubmit={handleLogin} >
            {/* Labels and inputs for form data */}
            <div className="form-container">
              <label className="register-label">User Name or Email</label>
              <input className="register-input"
                // onChange={(e) => setUsernameOrEmail(e.target.value)}
                autoComplete="on"
                required name='fieldOne'
              />
              <label className="register-label">Password</label>
              <input className="register-input"
                // onChange={(e) => setUserPassword(e.target.value)}
                type="password"
                required name='fieldTwo' />
            </div>
            {/* <div>
        </div> */}
            <div className="row button-container">
              <button className="register-btn" type="submit">
                Login
              </button>
              <Link to={`/register`}><button className="register-btn">Register</button></Link>
            </div>
          </form>
        </div>
      </section>
    )
}

export default Login