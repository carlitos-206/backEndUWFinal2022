import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import checkVal from './logic/checkVal';
import readTheDate from './logic/readTheDate';
import totalAcres from './logic/totalAcres';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
// import FireMapAppData from './components/FireMapAppData';
import Banner from './Banner'
import Footer from './Footer'
import SigninButton from './SignInButton';
import ViewComments from './viewComments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from "react-router-dom";


const axios = require('axios')
export default function BookMarkPage(){
  const navigate = useNavigate()
  let local = localStorage.getItem('loginData')
  let localObj = JSON.parse(local)
  const [bookmarks, setBookMark] = useState(null)
  const [fire, setFire] = useState(null)
  useEffect(()=>{
    if(localObj){
      axios.get(`https://uw-api-2022.herokuapp.com/fires/user/${localObj.username}/bookmarks`)
      .then(res => setBookMark(res.data))
    }else{
      navigate('/login')
    }
  }, [])

  console.log(bookmarks)
  const sendToDetails = (e, id) =>{
    e.preventDefault()
    navigate(`/map/${id}`)
  }
  if(bookmarks){
    return(
        <main>
          <Banner />
            <nav>
              <Link to= "/"><button><FontAwesomeIcon icon={solid('map-location-dot')} /> Home</button></Link>
            </nav>
            <div className='usersBookMark'>
              {bookmarks.map((data, idx)=>{
                console.log(data)
                return(
                  <div key={idx}>
                    <br/>
                    <button value={data._id} onClick={(e)=>{sendToDetails(e, data.fire_id )}}>Bookmark {idx + 1}</button>
                    <br/>
                  </div>
                )
              })}
            </div>
          </main>
    )
  }else{
    <main>
          <Banner />
            <nav>
              <Link to= "/"><button><FontAwesomeIcon icon={solid('map-location-dot')} /> Home</button></Link>
            </nav>
            <div className='usersBookMark'>
                <h1> Empty</h1>
            </div>
          </main>
  }
}