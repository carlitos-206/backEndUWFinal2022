import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';

// const comments = [
//     {
//         _id: "730ac78346bab76c88694d90",
//         post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur enim non faucibus malesuada. Phasellus fermentum orci quis justo porttitor consectetur. Mauris consequat massa ligula, sed mattis mi eleifend sit amet. Mauris justo massa, posuere commodo viverra id, tincidunt id ex.",
//         user_id: "630ac78346bab76c88694d90"
//     },

//     {
//         _id: "730ac78346bab76c88694d91",
//         post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur enim non faucibus malesuada. Phasellus fermentum orci quis justo porttitor consectetur. Mauris consequat massa ligula, sed mattis mi eleifend sit amet. Mauris justo massa, posuere commodo viverra id, tincidunt id ex.",
//         user_id: "630ac78346bab76c88694d90"
//     },

//     {
//         _id: "730ac78346bab76c88694d92",
//         post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur enim non faucibus malesuada. Phasellus fermentum orci quis justo porttitor consectetur. Mauris consequat massa ligula, sed mattis mi eleifend sit amet. Mauris justo massa, posuere commodo viverra id, tincidunt id ex.",
//         user_id: "630ac78346bab76c88694d90"
//     }

// ]
function Posts() {

    const [comments, setComments] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    let newObj = window.localStorage.getItem("loginData",);
    let loggedUser = JSON.parse(newObj);
    console.log(loggedUser);
    const username = loggedUser.username;
    console.log(username);

    console.log(`https://uw-api-2022.herokuapp.com/fires/comments/user/${username}`)
    useEffect(() => {
        fetch(`https://uw-api-2022.herokuapp.com/fires/comments/user/${username}`)

            .then(response => response.json())

            .then(
                data => {
                    setComments(data);
                    setIsLoading(false);
                },

                error => {
                    setHasError(true)
                    setIsLoading(false);

                }
            );


    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }


    return (
        <>
            <Banner />
            <nav>
                <Link to={'/login'}><button type="submit" className="submit-btn">Sign-in/Register</button></Link>
                <Link to={`/`}><button className="submit-btn">Return to Maps</button></Link>
            </nav>
            <div className="posts row">
                <div class="comment-btn-container">
                    <Link to={`createpost`}><button className="comment-btn">Create Post</button></Link>
                </div>
                <div className="comment-container">
                    {comments.map((comment, id) =>
                        <section className="column comment-card" key={id} >
                            <div className="list">
                                <div>
                                    {comment.post}
                                </div>
                                <div className="row list-info">
                                    <Link to={`/edit/${comment._id}`}><button className="comment-link">Edit</button></Link>
                                    <Link to={`/deletepost/${comment._id}`}><button className="comment-link">Delete</button></Link>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    )
}
export default Posts
