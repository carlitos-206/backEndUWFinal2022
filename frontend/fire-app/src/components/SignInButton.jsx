import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function SigninButton() {

    return (
        <Link to = {'/login'}><button type="submit" className="submit-btn"><FontAwesomeIcon icon={solid('right-to-bracket')} /> Login / Register</button></Link>
    )

}

export default SigninButton