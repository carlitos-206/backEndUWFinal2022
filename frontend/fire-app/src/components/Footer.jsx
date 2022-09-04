import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


function Footer() {

    return (
        <div>
            <footer>
                <p>
                    <a href="https://github.com/carlitos-206/backEndUWFinal2022">
                        <FontAwesomeIcon icon={solid('code-fork')} /> GitHub
                    </a>
                </p>
            </footer>
        </div>
    )

}

export default Footer