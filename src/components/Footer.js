//src/components/Footer.js
//This component renders the fixed footer with the app's name and current year.
//It includes a clickable "Fetch Me a Movie" link that navigates home and reloads the page.

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
    //get the current year dynamically
    const currentYear = new Date().getFullYear();

    //react Router hook for programmatic navigation
    const navigate = useNavigate();

    //handles clicking or keyboard activation on the footer logo
    //navigates to homepage and forces a page reload
    const handleLogoClick = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <footer>
            <p>
                &copy; {currentYear}{' '}
                <span
                    onClick={handleLogoClick}                                   //trigger navigation and reload on click
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}  //makes it look like a link
                    aria-label="Go to homepage"                                 //screen reader-friendly description
                    role="button"                                               //makes the span behave like a button for assistive tech
                    tabIndex={0}                                                //makes the span focusable via keyboard
                    onKeyDown={(e) => {
                        //allow Enter or Space to trigger the action for accessibility
                        if (e.key === 'Enter' || e.key === ' ') handleLogoClick();
                    }}
                >
                    Fetch Me a Movie
                </span>
                . All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;



