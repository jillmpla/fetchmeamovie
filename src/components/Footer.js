import { Link, useLocation } from "react-router-dom";

function Footer(){
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
            <span>&copy; {year} </span>
            <Link to="/" className="footer-link" aria-label="Go to homepage" onClick={handleBrandClick}>
              Fetch Me a Movie
            </Link>
            <span> · <span className="emoji" aria-hidden="true">🎬</span> All rights reserved · Made with <span className="emoji" aria-hidden="true">❤️</span> for reel fans</span>
          </div>
        </footer>
    );
}

export default Footer;

