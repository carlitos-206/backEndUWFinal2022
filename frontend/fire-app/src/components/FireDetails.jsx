import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import checkVal from './logic/checkVal';
import readTheDate from './logic/readTheDate';
import totalAcres from './logic/totalAcres';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
// import FireMapAppData from './components/FireMapAppData';
import Banner from './Banner'
import Footer from './Footer'
import SigninButton from './SignInButton';
import ViewComments from './viewComments';
const axios = require('axios')
// import convertToUSD from './logic/converToUSD';
function FireDetails({ fireId }) {
    const [fire, setFire] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const userLogIn = () =>{
        if(localStorage.getItem('loginData')){
            const popUpCommentBox = (e) =>{
                e.preventDefault()
                const showCommentBox = document.getElementsByClassName('commentSection')[0]
                showCommentBox.setAttribute('style', 'display:block')
            }
            return(
                <button onClick={(e)=>{popUpCommentBox(e)}}>Comment</button>
            )
        }else{
            return(
                <SigninButton />
            )
        }
    }
    const closebox = (e) =>{
        const showCommentBox = document.getElementsByClassName('commentSection')[0]
        showCommentBox.setAttribute('style', 'display:none')
        location.reload()
    }
    const postComment = (e) =>{
        e.preventDefault()
        let comment = document.getElementById('commentText').value
        const localObjString = localStorage.getItem('loginData')
        const localObj = JSON.parse(localObjString)
        console.log(localObj)
        axios.post(`https://uw-api-2022.herokuapp.com/fires/${fireId}/user/${localObj.username}/comments`, {text: comment})
        closebox()
    }
    useEffect(() => {
        fetch(`https://uw-api-2022.herokuapp.com/fires/${fireId}`)
        .then(response => response.json())
        .then(
            data => {
                setFire(data);
                setIsLoading(false);
            },
            error => {
                setHasError(true)
                setIsLoading(false);
            }
        );
    }, [fireId]);
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }

    return (
        <>
        <main>
            <Banner />
            <nav>
                <Link to= "/"><button>Return Home</button></Link>
            </nav>
            <div className="container">
                
                <div className="column list-info">
                    <h2>{checkVal(fire.incident_name)}</h2>
                    <p>Lattitude:{checkVal(fire.location.latitude)}</p>
                    <p>Longitude:{checkVal(fire.location.longitude)}</p>
                    <p>City:{checkVal(fire.location.city)}</p>
                    <p>County: {checkVal(fire.location.county)}</p>
                    <p>State:{checkVal(fire.location.state)}</p>
                    <p>Discovered:{readTheDate(fire.fire_discovery_datetime)}</p>
                    <p>Contained:{readTheDate(fire.containment_datetime)}</p>
                    <p>Controlled:{readTheDate(fire.control_datetime)}</p>
                    <p>Fire Out Date:{readTheDate(fire.fire_out_datetime)}</p>
                    <p>Daily Acres:{checkVal(fire.daily_acres)}</p>
                    <p>Total Acres:{totalAcres(fire.containment_datetime, fire.control_datetime, fire.daily_acres, fire.total_acres)}</p>
                    <p>Cause:{checkVal(fire.fire_origin.cause)} Activity</p>
                    <p>Predominant Fuel: {checkVal(fire.predominant_fuel_group)} </p>
                    <p>Cost:{fire.estimated_cost_to_date}</p>
                    <p>Source: {checkVal(fire.source)}</p>
                </div>
            <div className ="link-buttons">
                {userLogIn()}
                <div className='commentSection' style={{
                    display:'none'}}>
                    <form className='comentForm' onSubmit={(e)=>{postComment(e)}} >
                        <textarea name="comment" id="commentText" cols="38" rows="10" placeholder='Enter comment'></textarea>
                        <input type="reset"  onClick={closebox} value="Cancel" />
                        <input type='submit' />
                    </form>
                </div>
            </div>
            <ViewComments fire_id={fireId} />
        </div>
            <Footer />
        </main>
        </>
    )
}
FireDetails.propTypes = {
    fireId: PropTypes.string.isRequired,

}

export default FireDetails