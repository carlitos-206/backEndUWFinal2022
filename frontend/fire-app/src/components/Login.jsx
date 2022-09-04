import React from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Banner from './Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
const axios = require('axios')
function Login() {
  const navigate = useNavigate();
  // States for login
  // const [usernameOrEmail, setUsernameOrEmail] = useState(null);
  // const [password, setUserPassword] = useState(null);

  const handleLogin = (e) =>{
    e.preventDefault()
    let username = document.forms.logInForm.fieldOne.value
    let pass = document.forms.logInForm.fieldTwo.value
    console.log(username, pass)
    axios.post('https://uw-api-2022.herokuapp.com/users/login', {usernameOrEmail: username, password: pass})
    .then(response => console.log(response.data))
    .then(data => console.log(data) )
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