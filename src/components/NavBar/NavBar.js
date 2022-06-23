import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container d-flex">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <Link className="nav-link  text-light " to="/today">
            Today
          </Link>
          <Link className="nav-link  text-light" to="/overdue">
            Over Due
          </Link>
          <Link className="nav-link  text-light" to="/completed">
            Completed
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
