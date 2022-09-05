import React, {useState, useEffect} from "react";
import readTheDate from './logic/readTheDate';
const axios = require('axios')
export default function ViewComments({fire_id}){
  const [comments, setData] = useState(null)  
  useEffect(()=>{
    axios.get(`https://uw-api-2022.herokuapp.com/fires/${fire_id}/comments`)
    .then(response =>
      setData(response.data)
    )
  },[])
  const local = localStorage.getItem('loginData')
  const localObj = JSON.parse(local)
  if(comments !== null){
    return (
      <div className="fireCommentSection">
        {comments.map((data)=>{
          if(localObj){    
            if(localObj.username === data.username){
              const userBtns = document.getElementsByClassName('userOwnCommentBtn')
              for(let i = 0; i < userBtns.length; i++){
                userBtns[i].setAttribute('style', 'display:block')
              }
            }
          }
            return(
              <div className="fireComments">
                <div className="commentBody">
                  {data.text}
                </div>
                <div className="commentAuthor">
                  Posted By: {data.username} ON {readTheDate(data.createdDate)}
                </div>
                <div>
                  <button className="userOwnCommentBtn" style={{"display":"none"}}>Edit</button>
                  <button className="userOwnCommentBtn" style={{"display":"none"}}>Delete</button>
                </div>
            </div>
            )}
          )}
      </div>
    )
  }
}