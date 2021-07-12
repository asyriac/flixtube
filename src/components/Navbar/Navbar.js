import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context";
import "./Navbar.css";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { isLoggedIn } = useAuthContext();

  const handleNav = () => {
    setShowNav((prevState) => !prevState);
  };

  return (
    <nav className="navbar bg-white">
      <div className="nav-brand">
        <h2>
          <Link to="/">Flixtube</Link>
        </h2>
      </div>
      <div onClick={handleNav}>
        <span className="toggle">&#9776;</span>
      </div>
      <div className={`navbar-right ${showNav && "active"}`}>
        <ul className="nav-items">
          {isLoggedIn ? (
            <>
              <li className="nav-link-item" onClick={() => setShowNav(false)}>
                <Link to="/">Home</Link>
              </li>
              <li className="nav-link-item" onClick={() => setShowNav(false)}>
                <Link to="/playlists">Playlists</Link>
              </li>
              <li className="nav-link-item" onClick={() => setShowNav(false)}>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <li className="nav-link-item" onClick={() => setShowNav(false)}>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
