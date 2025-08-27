import { Link, useLocation } from "react-router-dom";

function Header() {
    const { pathname } = useLocation();

    return (
        <header className="app-header" role="banner">
            <a href="#main" className="skip-link">Skip to content</a>

            <div className="header-inner">
                <Link to="/" className="brand" aria-label="Go to homepage">
                    <img src="/movieicon.png" alt="" />
                    <span className="brand-title">Fetch Me a Movie</span>
                </Link>

                <nav aria-label="Main">
                    <ul>
                        <li>
                            <Link to="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
export default Header;
