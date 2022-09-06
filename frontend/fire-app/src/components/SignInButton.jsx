import React from 'react';
import { Link } from 'react-router-dom';

function SigninButton() {

    return (
        <Link to = {'/login'}><button type="submit" className="submit-btn">Login / Register</button></Link>
    )

}

export default SigninButton