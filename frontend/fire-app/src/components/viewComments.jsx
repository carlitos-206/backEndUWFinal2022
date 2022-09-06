import React, {useState, useEffect} from "react";
import readTheDate from './logic/readTheDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const axios = require('axios')
export default function ViewComments({fire_id}){
  const [comments, setData] = useState(null)  
  
  const refresh = () =>{
    axios.get(`https://uw-api-2022.herokuapp.com/fires/${fire_id}/comments`)
    .then(response =>
      setData(response.data)
    )
    }
  setTimeout(()=>{
    refresh()
  },5000)
  useEffect(()=>{
      axios.get(`https://uw-api-2022.herokuapp.com/fires/${fire_id}/comments`)
      .then(response =>
        setData(response.data)
      )
  },[])
  useEffect(()=>{
    axios.get(`https://uw-api-2022.herokuapp.com/fires/${fire_id}/comments`)
    .then(response =>
      setData(response.data)
    )
},[])

const deleteComment = (e, comment_id, local_username, owner_username)=>{
  e.preventDefault()
  if(local_username === owner_username){
    axios.delete(`https://uw-api-2022.herokuapp.com/fires/comments/${comment_id}`)
    .then(res => console.log(res.data))
  }else{
    alert(`You aren't comment owner @${local_username}`)
  }

}



const local = localStorage.getItem('loginData')
const localObj = JSON.parse(local)
if(comments !== null){
  let reverseList = comments.reverse();
  return (
    <div className="fireCommentSection">
      {reverseList.map((data, idx)=>{
        console.log(data)
      if(localObj){    
        if(localObj.username === data.username){
          const userBtns = document.getElementsByClassName('userOwnCommentBtn')
          for(let i = 0; i < userBtns.length; i++){
            userBtns[i].setAttribute("style", 'display:block')
          }
        }
        }
      return(
          <div className="fireComments" key={idx}>
            <h3 className="user-comments"><FontAwesomeIcon icon={solid('comments')} /> Comments</h3>
            <div className="commentBody">
              {data.text}
            </div>
            <div className="commentAuthor">
              <FontAwesomeIcon icon={solid('user')} /> {data.username} <FontAwesomeIcon icon={solid('calendar')} /> {readTheDate(data.createdDate)}
            </div>
            <div className ="button-container">
              <button style={{"display":"none"}} onClick={(e)=>{deleteComment(e, data._id, localObj.username, data.username)}}><FontAwesomeIcon icon={solid('trash')} /> Delete</button>
              <button className="primary-btn" style={{"display":"none"}} ><FontAwesomeIcon icon={solid('pen-to-square')} /> Edit</button>
            </div>
        </div>
        )}
        )}
      </div>
    )
  }
}