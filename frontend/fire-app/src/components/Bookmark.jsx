import React, { useState, useEffect } from "react";
import "rsuite/dist/rsuite.min.css";
import { Toggle } from "rsuite";
import bookmarkicon from "../images/bookmark.png";
import "../App.css";
import axios from "axios";

function Bookmark(props) {
  const fireid = props.fireid;
  const username = props.username;

  const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
  //const [post, setPost] = useState(null);
  /**
  const TestGetAxios = () => {
    useEffect(() => {
      axios.get(baseURL).then((response) => {
        setPost(response.data);
        console.log("response.data", response.data);
      });
    }, []);

    if (!post) {
      return null;
    } else {
      return post;
    }
  };
  **/
//test GETAxios
  useEffect(() => {
    async function TestGetAxios() {
      try {
        const data = await axios.get(baseURL);
        //setPost(data);
        console.log(data);
        
      } catch (err) {
        console.log(err);
      }
    }
    TestGetAxios();
  }, []);
  
  //console.log("Test getAsios: ", TestGetAxios());

  //test POSTAxios

  useEffect(() => {
    async function TestPOSTAxios() {
      const data = {
        title: "Hello World!",
        body: "This is a new post.",
        userId: 1,
      };
      try {
        const postURL = "https://jsonplaceholder.typicode.com/posts";
        const post = await axios.post(
          postURL,
          data
        );
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    }
    TestPOSTAxios();
  }, []);
  // Test TestDELETEAxios
  /**
  useEffect(() => {
    asyn function TestDELETEAxios() {
      try {
        axios
      .delete(`${baseURL}/1`)
      .then(() => {
        alert("Post deleted!");
        setPost(null)
      });
      }
    }
  }, []);
  **/
  // hasBookmark
  // return true if a bookmark exists for a fireid and a username
  // else return false
  const hasBookmark = (fireid, username) => {
    //Todo: call getBookmarkId
    let isBookMark = false;
    if (getBookmarkId(fireid, username)) {
      isBookMark = true;
    }
    // testing
    isBookMark = false;
    // testing only
    return isBookMark;
  };
  // get bookmarkid by a fireid and username
  const getBookmarkId = (fireid, username) => {
    const bkmid = 32134434;
    //Todo: axios get
    return bkmid;
  };
  const [currentValue, setCurrentValue] = useState(
    hasBookmark(fireid, username)
  );

  console.log(fireid);
  console.log(username);
  // handle button toggle event
  const hideshowBookmark = (event) => {
    setCurrentValue(event);
    console.log("currentValue:", currentValue);

    if (currentValue === true) {
      const bkmid = getBookmarkId(fireid, username);
      deleteBookmark(bkmid);
    } else {
      addBookmark(fireid, username);
    }
  };
  // delete a bookmark by bookmarkid
  const deleteBookmark = (bookmarkId) => {
    console.log("Delete bookmark:", bookmarkId);
    // Todo: Axios delete
  };
  // add a bookmark by fireid, username
  const addBookmark = (fireid, username) => {
    console.log("Add bookmark fireid and username", fireid, username);
    // Todo: Axios post
  };
  return (
    <div
      style={{
        display: "block",
        width: 400,
        paddingLeft: 30,
      }}
    >
      <h4>Add/Remove a Bookmark</h4>
      <Toggle onChange={(value) => hideshowBookmark(value)} />
      {currentValue === true ? "Bookmark Added" : "Bookmark Removed"}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {currentValue === true ? (
        <img className="bookmark-icon" src={bookmarkicon} alt="bookmarkimg" />
      ) : null}
    </div>
  );
}
export default Bookmark;
