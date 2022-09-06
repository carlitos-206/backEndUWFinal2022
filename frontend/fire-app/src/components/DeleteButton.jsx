import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function DeleteButton() {

    return (
        <div>
            <div>  <button type="submit"><FontAwesomeIcon icon={solid('trash')} /> Delete</button></div>
        </div>
    )

}

export default DeleteButton