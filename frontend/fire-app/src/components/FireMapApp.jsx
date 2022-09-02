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
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const ShowDropDown = (props) => {
    const month = props.month;
    const year = props.year;

    const handleMonthChange = (e) => {
      e.preventDefault();
      setMonth(months[e.target.selectedIndex]);
      LoadData(month, year);
      console.log(`In Mon - month: ${month} year: ${year}`);
    };
    const handleYearChange = (evt) => {
      evt.preventDefault();
      setYear(years[evt.target.selectedIndex]);
      LoadData(month, year);
      console.log(`In month: ${month} - year: ${year}`);
    };

    return (
      <div className="center">
        <label htmlFor="months">Month:</label>
        <select value={month} onChange={handleMonthChange}>
          {months.map((mon) => (
            <option value={mon}>{mon}</option>
          ))}
        </select>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <label htmlFor="years">Year:</label>
        <select value={year} onChange={handleYearChange}>
          {years.map((yr) => (
            <option value={yr}>{yr}</option>
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

  function LoadData(mon, yr) {
    let url = `https://uw-api-2022.herokuapp.com/fires/in/${mon}/${yr}`;
    console.log("url: ", url);
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
  }
  useEffect(() => {
    let mm = getCurrentMonth();
    let yy = getCurrentYear();

    setMonth(mm);
    setYear(yy);

    LoadData(mm, yy);
    //LoadData("Mar", yy);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return <p>An error has occurred. Please try again.</p>;
  }

  return (
    <div>
      <p className="center">Available dataset Jul/2014 - Aug/2022</p>
      <br />
      <ShowDropDown month={month} year={year}></ShowDropDown>
      <br />
      <Map places={fires} center={{ lat: 47.444, lng: -120.021 }} />
    </div>
  );
}

export default FireMapApp;
