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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const axios = require('axios')
import {useNavigate} from 'react-router-dom';
// import convertToUSD from './logic/converToUSD';
function FireDetails({ fireId }) {
    const navigate = useNavigate();

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
                <button className="primary-btn" onClick={(e)=>{popUpCommentBox(e)}}><FontAwesomeIcon icon={solid('comment')} /> Comment</button>
            )
        }else{
            return(
                <SigninButton />
            )
        }
    }
    const closebox = (e) =>{
        let commentText = document.getElementById('commentText')
        commentText.value = ''
        let showCommentBox = document.getElementsByClassName('commentSection')[0]
        showCommentBox.setAttribute('style', 'display:none')
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
                if(data.error){
                    alert(`${data.error}`)
                    navigate('/')
                }else{
                setFire(data);
                setIsLoading(false);
                }
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
                    <Link to= "/"><button><FontAwesomeIcon icon={solid('map-location-dot')} /> Home</button></Link>
                </nav>
                <div className="card">
                    <div className="card-header">
                        <h2><FontAwesomeIcon icon={solid('fire-flame-curved')} /> {checkVal(fire.incident_name)}</h2>
                        <Link to={`/`}>
                            <button>
                                <FontAwesomeIcon icon={solid('x')} />
                            </button>
                        </Link>
                    </div>
                    <ul className="fire-details">
                        <li><em>Latitude:</em> {checkVal(fire.location.latitude)}</li>
                        <li><em>Longitude:</em> {checkVal(fire.location.longitude)}</li>
                        <li><em>City:</em> {checkVal(fire.location.city)}</li>
                        <li><em>County:</em> {checkVal(fire.location.county)}</li>
                        <li><em>State:</em> {checkVal(fire.location.state)}</li>
                        <li><em>Discovered:</em> {readTheDate(fire.fire_discovery_datetime)}</li>
                        <li><em>Contained:</em> {readTheDate(fire.containment_datetime)}</li>
                        <li><em>Controlled:</em> {readTheDate(fire.control_datetime)}</li>
                        <li><em>Fire Out Date:</em> {readTheDate(fire.fire_out_datetime)}</li>
                        <li><em>Daily Acres:</em> {checkVal(fire.daily_acres)}</li>
                        <li><em>Total Acres:</em> {totalAcres(fire.containment_datetime, fire.control_datetime, fire.daily_acres, fire.total_acres)}</li>
                        <li><em>Cause:</em> {checkVal(fire.fire_origin.cause)} Activity</li>
                        <li><em>Predominant Fuel:</em> {checkVal(fire.predominant_fuel_group)} </li>
                        <li><em>Cost:</em> {fire.estimated_cost_to_date}</li>
                        <li><em>Source:</em> {checkVal(fire.source)}</li>
                    </ul>
                    <div className ="button-container">
                        {userLogIn()}
                    </div>
                    <div className='commentSection' style={{
                        display:'none'}}>
                        <form className='comentForm' onSubmit={(e)=>{postComment(e)}} >
                            <textarea name="comment" id="commentText" cols="38" rows="10" placeholder='Enter comment' required></textarea>
                            <div className="button-container">
                                <button type="reset" onClick={closebox} value="Cancel">Cancel</button>
                                <button type='submit' className='primary-btn'>Submit</button>
                            </div>
                        </form>
                    </div>
                    <ViewComments fire_id={fireId} />
                </div>
            </main>
        </>
    )
}
FireDetails.propTypes = {
    fireId: PropTypes.string.isRequired,

}

export default FireDetails