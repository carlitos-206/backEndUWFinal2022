import React from 'react';
import Banner from '../components/Banner'
import { Link } from 'react-router-dom';

const comments = [
    {
        _id: "730ac78346bab76c88694d90",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur enim non faucibus malesuada. Phasellus fermentum orci quis justo porttitor consectetur. Mauris consequat massa ligula, sed mattis mi eleifend sit amet. Mauris justo massa, posuere commodo viverra id, tincidunt id ex.",
        user_id: "630ac78346bab76c88694d90"
    },

    {
        _id: "730ac78346bab76c88694d91",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur enim non faucibus malesuada. Phasellus fermentum orci quis justo porttitor consectetur. Mauris consequat massa ligula, sed mattis mi eleifend sit amet. Mauris justo massa, posuere commodo viverra id, tincidunt id ex.",
        user_id: "630ac78346bab76c88694d90"
    },

    {
        _id: "730ac78346bab76c88694d92",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur enim non faucibus malesuada. Phasellus fermentum orci quis justo porttitor consectetur. Mauris consequat massa ligula, sed mattis mi eleifend sit amet. Mauris justo massa, posuere commodo viverra id, tincidunt id ex.",
        user_id: "630ac78346bab76c88694d90"
    }

]
function Posts() {

    // const [comments, setComments] = useState(undefined);
    // const [isLoading, setIsLoading] = useState(true);
    // const [hasError, setHasError] = useState(false);

    // useEffect(() => {
    //     fetch(url)

    //         .then(response => response.json())

    //         .then(
    //             data => {
    //                 setComments(data);
    //                 setIsLoading(false);
    //             },

    //             error => {
    //                 setHasError(true)
    //                 setIsLoading(false);

    //             }
    //         );


    // }, []);

    // if (isLoading) {
    //     return <p>Loading...</p>
    // }

    // if (hasError) {
    //     return <p>An error has occurred.  Please try again.</p>
    // }


    return (
        <Banner />>
        <div className="posts row">
            <section className="button-container column">
                <Link to={`/`}><button className="submit-btn">Home</button></Link>
                <Link to={`createpost`}><button className="submit-btn">Create Post</button></Link>
            </section>

            <div className = "comment-container">
                {comments.map((comment, id) =>
                    <section className="column card" key={id} >
                        <div className="list">
                            <div>
                                {comment.post}
                            </div>
                            <div className="row list-info">
                                <Link to={`/edit/${comment.id}`}><button className="submit-btn">Edit</button></Link>
                                <Link to={`/deletepost/${comment.id}`}><button className="submit-btn">Delete</button></Link>
                            </div>
                        </div>
                    </section>
                )}
            </div>

        </div>
    )
}
export default Posts
