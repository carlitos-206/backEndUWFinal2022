import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewBookMarks(){
  const navigate = useNavigate()
  let local = localStorage.getItem('loginData')
  let localObj = JSON.parse(local)
  function seeBookMarks(e){
    e.preventDefault()
    navigate('/myBookmarks')
  }
  if(localObj){
    return(
      <>
      <button onClick={(e)=>{seeBookMarks(e)}}>View Bookmarks</button>
      </>
    )
  }
}