//src/components/Header.js
//This component renders the top app header with the logo/title and Home navigation.
//Both the logo and the "Home" text link navigate to the homepage and reload the app.

import { useNavigate } from "react-router-dom";

function Header() {
    //react router hook for navigation
    const navigate = useNavigate();

    //handles navigation to the homepage and forces a reload
    const handleHomeClick = () => {
        navigate("/");
        window.location.reload();
    };

    return (
        <header className="app-header" role="banner">
            <div
                className="logo-title"
                onClick={handleHomeClick}    //trigger homepage navigation and reload on click
                role="button"                //makes it recognizable as a button for assistive tech
                tabIndex={0}                 //allows keyboard focus
                aria-label="Go to homepage"  //for screen readers
                onKeyDown={(e) => {
                    //support Enter or Space key for keyboard accessibility
                    if (e.key === "Enter" || e.key === " ") {
                        handleHomeClick();
                    }
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                <img
                    src="/movieicon.png"
                    alt="Movie logo"
                    className="logo-icon"
                    style={{ height: "40px", marginRight: "10px" }}
                />
                <h1 style={{ margin: 0 }}>Fetch Me a Movie</h1>
            </div>

            {/* Navigation menu */}
            <nav aria-label="Main navigation">
                <ul>
                    <li>
                        <span
                            onClick={handleHomeClick}
                            style={{ cursor: "pointer" }}
                            role="button"
                            tabIndex={0}
                            aria-label="Go to homepage"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") handleHomeClick();
                            }}
                        >
                            Home
                        </span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;





