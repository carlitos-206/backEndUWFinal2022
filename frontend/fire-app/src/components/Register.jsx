import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {useNavigate} from 'react-router-dom';

function Register() {
  const navigate = useNavigate();


  // States for registration

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  //   console.log(`Name ${userName}`);
  //  console.log(`Email ${userEmail}`);
  //  console.log(`Password ${userPassword}`);

  // Handle the login on submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      "username": userName,
      "email": userEmail,
      "password": userPassword,
      "firstName": userFirstName,
      "lastName": userLastName


    }

    //  username":"user1", "email":"carlitos@uw.edu","password":"secrets!", "firstName":"Carlos", "lastName":"Caceres
    // process the registration
    fetch('https://uw-api-2022.herokuapp.com/users/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if(data.Error){
          alert(`${data.Error}`)
        }else{
          navigate('/login')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <section className="register">
      <Banner />
      <div className="register-form card">
        <div className="card-header">
          <h2><FontAwesomeIcon icon={solid('right-to-bracket')} /> Register</h2> 
          <Link to={`/`}>
            <button>
              <FontAwesomeIcon icon={solid('x')} />
            </button>
          </Link>
        </div>
        <form>
          {/* Labels and inputs for form data */}
          <div className="form-container">
            <label className="register-label">User Name</label>
            <input className="register-input"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              autoComplete="on"
              required
            />
            <label className="register-label">Email</label>
            <input className="register-input"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              type="email"
              autoComplete="on"
              required
            />
            <label className="register-label">Password</label>
            <input className="register-input"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
              autoComplete="on"
              type="password"
              required />

            <label className="register-label">First Name</label>
            <input className="register-input"
              onChange={(e) => setUserFirstName(e.target.value)}
              value={userFirstName}
              autoComplete="on"
              type="text"
              required />

            <label className="register-label">Last Name</label>
            <input className="register-input"
              onChange={(e) => setUserLastName(e.target.value)}
              value={userLastName}
              autoComplete="on"
              type="text"
              required />

          </div>
          <div className="row button-container">
            <Link to={`/login`}><button>Login</button></Link>
            <button className="primary-btn" onClick={handleSubmit} type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register