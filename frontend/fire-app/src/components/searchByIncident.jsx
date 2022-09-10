import React from "react";
const axios = require('axios');
import {useNavigate} from 'react-router-dom';

export default function SearchIncidentName(){
  const navigate = useNavigate()
  
  const search = async(query) =>{
    let response = await axios.get(`https://uw-api-2022.herokuapp.com/fires/name/${query}`)
      return response.data
  }

  const searchByName = async(e) =>{
    e.preventDefault()
    const searchCase = document.getElementById('searchInput').value
    let query = encodeURIComponent(searchCase)
    let info = await search(query)
    if(info.length === 0){
      let lowerCase = await search(encodeURI(searchCase.toLowerCase()))
      if(lowerCase.length === 0){
        let upperCase = await search(encodeURI(searchCase.toUpperCase()))
        if(upperCase.length === 0){
          alert('Incident does not exist')
        }else{
          navigate(`/map/${info[0]._id}`)
        }
      }else{
        navigate(`/map/${info[0]._id}`)
      }
    }else{
      navigate(`/map/${info[0]._id}`)
    }
  }
  return(
    <div className="searchContainer">
      <form id="searchForm" onSubmit={searchByName}>
        <input type="text" id="searchInput" placeholder="Enter Incidente Name"/>
        <button type="submit">Search</button>
      </form>
    </div>
  )
}