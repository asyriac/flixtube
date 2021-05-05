import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {

    const [openSideNav, setOpenSideNav] = useState(false);

    const handleNav = () => {
        setOpenSideNav(!openSideNav);
    }

    return (
        <nav className=" bg-white">
            <div className="nav bg-white">
                <div className="  nav-brand">
                    <h2><Link to="/">Flixtube</Link></h2>
                </div>
                <button className="btn btn-secondary btn-sm mobile-view" onClick={handleNav}>
                    {openSideNav ?
                        <span className="close-nav" onClick={handleNav}>
                            X
                    </span>
                        :
                        <span className="" >
                            &#9776;
                    </span>
                    }
                </button>
                <ul className={`nav-link `}>
                    <li className="nav-link-item"><Link to="/">Home</Link></li>
                    <li className="nav-link-item"><Link to="/playlists">Playlists</Link></li>
                </ul>
            </div>
            {
                openSideNav &&
                <ul className="nav-link-mobile">
                    <li className="nav-link-item"><Link to="/">Home</Link></li>
                    <li className="nav-link-item"><Link to="/playlists">About</Link></li>
                </ul>
            }

        </nav >


    )

}

export default Navbar;