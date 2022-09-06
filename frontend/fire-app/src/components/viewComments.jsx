import React, {useState, useEffect} from "react";
import readTheDate from './logic/readTheDate';
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
  let reverseList = comments.reverse()
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
            <h2 className="user-comments">User Comments</h2>
            <div className="commentBody">
              {data.text}
            </div>
            <div className="commentAuthor">
              Posted By: {data.username} ON {readTheDate(data.createdDate)}
            </div>
            <div className ="row user-comment-btn">
              <button className="userOwnCommentBtn" style={{"display":"none"}} >Edit</button>
              <button className="userOwnCommentBtn" style={{"display":"none"}} onClick={(e)=>{deleteComment(e, data._id, localObj.username, data.username)}}>Delete</button>
            </div>
        </div>
        )}
        )}
      </div>
    )
  }
}