//src/components/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Footer() {
    const year = new Date().getFullYear();
    const location = useLocation();

    const handleBrandClick = (e) => {
        if (location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer role="contentinfo">
            <div className="footer-inner">
                <p>
                    &copy; {year}{" "}
                    <Link
                        to="/"
                        className="footer-link"
                        aria-label="Go to homepage"
                        onClick={handleBrandClick}
                    >
                        Fetch Me a Movie
                    </Link>
                    {" · "}
                    <a href="/about.html" className="footer-link">
                        About
                    </a>
                    {" · "}
                    <a href="/privacy.html" className="footer-link">
                        Privacy
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
