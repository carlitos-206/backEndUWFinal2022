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
  },8000)
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
    .then(res =>{ 
      if(res.data.Error){
        alert('Fail to delete')
      }
    })
  }else{
    alert(`You aren't comment owner @${local_username}`)
  }

}

const sendUpdatedComment = () =>{
  let comment = document.getElementById('commentBox')
  comment.value = current_comment
}

const updateComment = async (e, comment_id, local_username, owner_username, current_comment) =>{
  if(local_username === owner_username){
    document.getElementsByClassName('editCommentBox')[0].setAttribute('style', 'display:block')
    let comment = document.getElementById('commentBox')
    comment.value = current_comment
    let commentID = document.getElementById('commentID')
    commentID.value = comment_id
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
        <div>
            <div className="fireComments" key={idx}>
              <div className="commentBody">
                {data.text}
              </div>
              <div className="commentAuthor">
                Posted By: {data.username} ON {readTheDate(data.createdDate)}
              </div>
              <div>
                <button className="userOwnCommentBtn" style={{"display":"none"}} onClick={(e)=>{updateComment(e, data._id, localObj.username, data.username , data.text)}} >Edit</button>
                <button className="userOwnCommentBtn" style={{"display":"none"}} onClick={(e)=>{deleteComment(e, data._id, localObj.username, data.username)}}>Delete</button>
              </div>
            </div>
            <div className="editCommentBox" style={{display: 'none'}}>
                <form >
                  <input type="hidden" id="commentID" />
                  <textarea id="commentBox" name="comment" cols="30" rows="10"></textarea>
                  <button type="reset">Cancel</button>
                  <button type="Submit">Submit</button>
                </form>
            </div>
        </div>
        )}
        )}
      </div>
    )
  }
}