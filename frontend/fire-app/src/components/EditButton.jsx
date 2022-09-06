import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function EditButton() {

    return (
 
            <button type="submit" className="primary-btn"><FontAwesomeIcon icon={solid('pen-to-square')} /> Edit</button>
 
    )

}

export default EditButton