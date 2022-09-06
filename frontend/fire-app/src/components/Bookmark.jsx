import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
const axios = require('axios')

function Bookmark({fire_id}) {
  let [bookMark, setBookMark] = useState(false)
  const navigate = useNavigate()
  let local = localStorage.getItem('loginData')
  let localObj = JSON.parse(local)
  let username;
  if(localObj){
    username = localObj.username
  }
  // const bookmarkExist = () =>{
  //   axios.get(`https://uw-api-2022.herokuapp.com/fires/${fire_id}/user/${username}/bookmarks`)
  //   .then(res =>{
  //     if(res.data._id){
  //       console.log('here')
  //       bookMark = true
  //     }
  //   })
  // }
  useEffect(()=>{
    axios.get(`https://uw-api-2022.herokuapp.com/fires/${fire_id}/user/${username}/bookmarks`)
    .then(res =>{
      if(res.data._id){
        console.log('here usf')
        setBookMark(true)
      }
    })
  }, [])
  // bookmarkExist()
  console.log(bookMark)
  if(bookMark === true){
    let removeBtn = document.getElementById('removeBtn')
    removeBtn.setAttribute('style', 'display:block')
    let addBtn = document.getElementById('addBtn')
    addBtn.setAttribute('style', 'display:none')
  }
  function addBookmark(e){
    e.preventDefault()
    if(username){
      let addBtn = document.getElementById('addBtn')
      addBtn.setAttribute('style', 'display:none')
      let removeBtn = document.getElementById('removeBtn')
      removeBtn.setAttribute('style', 'display:block')
      axios.post(`https://uw-api-2022.herokuapp.com/fires/${fire_id}/user/${username}/bookmarks`)
      .then(res => alert(res.data))
    }else{
      navigate('/login')
    }
  }
  function removeBookmark(e, id){
    e.preventDefault()
    let removeBtn = document.getElementById('removeBtn')
    removeBtn.setAttribute('style', 'display:none')
    let addBtn = document.getElementById('addBtn')
    addBtn.setAttribute('style', 'display:block')
  }
  if(username){
    return(
      <div className="bookMark">
        <button id="addBtn" onClick={(e)=>{addBookmark(e, fire_id)}} style={{display:'block'}}>✰</button>
        <button id="removeBtn" onClick={(e)=>{removeBookmark(e, fire_id)}} style={{display:'none'}}>⭐</button>
      </div>
    )
  }
}
export default Bookmark;
