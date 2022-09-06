import React, { useEffect, useState } from "react";

import Map from "./Map";

import "../App.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

function FireMapApp() {
  const [fires, setFires] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(getCurrentYear());

  const ShowDropDown = (props) => {
    const month = props.month;
    const year = props.year;

    const handleMonthChange = (e) => {
      e.preventDefault();
      setMonth(months[e.target.selectedIndex]);
      console.log(`In Mon - month: ${month} year: ${year}`);
    };
    const handleYearChange = (e) => {
      e.preventDefault();
      setYear(years[e.target.selectedIndex]);
      console.log(`In month: ${month} - year: ${year}`);
    };

    return (

      <div className="map-date-controls">
        <label htmlFor="months">Month</label>
        <select value={month} onChange={handleMonthChange}>
          {months.map((mon, idx) => (
            <option value={mon} key={idx}>{mon}</option>
          ))}
        </select>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <label htmlFor="years">Year</label>
        <select value={year} onChange={handleYearChange}>
          {years.map((yr, idx) => (
            <option value={yr} key={idx}>{yr}</option>
          ))}
        </select>
      </div>
    );
  };

  function getCurrentMonth() {
    const d = new Date();
    const m = months[d.getMonth()];
    return m;
  }
  function getCurrentYear() {
    const d = new Date();
    const y = d.getFullYear();
    return y;
  }
  useEffect(()=>{
    let url = `https://uw-api-2022.herokuapp.com/fires/in/${month}/${year}`;
      fetch(url)
        .then((response) => response.json())
        .then(
          (data) => {
            setFires(data);
            setIsLoading(false);
          },
          (error) => {
            setHasError(true);
            setIsLoading(false);
          }
        );
  }, [month, year])

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return <p>An error has occurred. Please try again.</p>;
  }

  return (
    <div>
      <p><b>Available dataset:</b> Jul / 2014 - Aug / 2022</p>
      <ShowDropDown month={month} year={year}></ShowDropDown>
      <Map places={fires} center={{ lat: 47.444, lng: -120.021 }} />
    </div>
  );
}

export default FireMapApp;
