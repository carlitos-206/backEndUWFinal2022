import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Banner from './Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function Login() {
  const navigate = useNavigate();
  // States for login
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setUserPassword] = useState('');

  console.log(`Email ${usernameOrEmail}`);
  console.log(`Password ${password}`);

  // Handle the login on submit
  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      "usernameOrEmail": usernameOrEmail,
      "password": password
    }
 
    // process the login
    fetch('https://uw-api-2022.herokuapp.com/users/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);

        if (data.token !== '' || data.token !== null) {
          const loginData = data
         localStorage.setItem("authenticated", true);
         localStorage.setItem("loginData", JSON.stringify(loginData));
         navigate("/posts");
       }

      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
          <form >
            {/* Labels and inputs for form data */}
            <div className="form-container">
              <label className="register-label">User Name or Email</label>
              <input className="register-input"
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                value={usernameOrEmail}
                type="email"
                autoComplete="on"
                required
              />
              <label className="register-label">Password</label>
              <input className="register-input"
                onChange={(e) => setUserPassword(e.target.value)}
                value={password}
                autoComplete="on"
                type="password"
                required />
            </div>
            {/* <div>
        </div> */}
            <div className="row button-container">
              <button onClick={handleLogin} className="register-btn" type="submit">
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