import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function CreatePost() {
  const { id } = useParams();

  // States for create comment
  const [text, setText] = useState('');

  // define fire id
  const fireId = id
  console.log(fireId);
 
// define username
  let newObj = window.localStorage.getItem("loginData", );
  let loggedUser = JSON.parse(newObj);
    console.log(loggedUser);
    const username =  loggedUser.username ;
    console.log(username);
  
console.log(`https://uw-api-2022.herokuapp.com//fires/${fireId}/user/${username}/comments`)

  // Handle post comment on submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "username": username,
      "text": text,
    }
    //  username":"user1", "email":"carlitos@uw.edu","password":"secrets!", "firstName":"Carlos", "lastName":"Caceres
    // process the registration
    fetch(`https://uw-api-2022.herokuapp.com//fires/${fireId}/user/${username}/comments`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <section className="register">
      <div className="register-form">
        <div>
          <h2>Post a Comment</h2>
        </div>
        <form>
          {/* Labels and inputs for form data */}
          <div className="form-container">
            <label className="register-label">Post message</label>
            <input className="register-input"
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
              autoComplete="on"
              required
              size="30"
            />
          </div>
          <div className="row button-container">
            <Link to={`/`}><button className="register-btn">Cancel</button></Link>
            <button onClick={handleSubmit} className="register-btn" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default CreatePost