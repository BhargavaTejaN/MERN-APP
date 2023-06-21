import React from "react";
import { Link } from "react-router-dom";

import { useLogout } from "../../hooks/useLogout";
import { useUserContext } from "../../hooks/useUserContext";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useUserContext();

  const handleClick = () => logout();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Students</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick} type="button">
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sigin</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
