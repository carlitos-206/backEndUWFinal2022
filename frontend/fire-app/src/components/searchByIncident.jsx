import React, { useState, useEffect } from "react";
const axios = require('axios');


export default function SearchIncidentName(){
  const [data, setData] = useState(null)
  let response;
  const searchAllUperCase = (searchCase) =>{
    let query = encodeURI(searchCase)
      axios.get(`https://uw-api-2022.herokuapp.com/fires/name/${query}`)
      .then(res => {
        if(res.data !== []){
          response= res.data
          
        }
        return response
      })
  }
  const searchAllLowerCase = (searchCase) =>{
    let query = encodeURI(searchCase)
      axios.get(`https://uw-api-2022.herokuapp.com/fires/name/${query}`)
      .then(res => {
        if(res.data !== []){
          response= res.data
          
        }
        return response
      })
    
  }

  const search = (searchCase) =>{
    let query = encodeURI(searchCase)
      axios.get(`https://uw-api-2022.herokuapp.com/fires/name/${query}`)
      .then(res => {
        if(res.data !== []){
          response= res.data
          
        }
        return response
      })
  }
  
  const multipleQ = (searchCase) =>{
    if(data === null){
      search(searchCase)
      searchAllUperCase(searchCase.toUpperCase())
      searchAllLowerCase(searchCase.toLowerCase())
    }else{
    }
  }

  const searchByName = async(e) =>{
    e.preventDefault()
    const searchCase = document.getElementById('searchInput').value
    multipleQ(searchCase)
    console.log(response)
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