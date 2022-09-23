import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import "./home.css";

const Home = () => {
  const [isActive, setActive] = useState(true);
  const { user, logout, userRoles } = UseAuth();
  const toggleClass = () => {
    setActive(!isActive);
  };
  const pages = [
    { name: "Create Book", link: "/create-book", role: "CREATOR" },
    { name: "My Books", link: "/my-books", role: "VIEWER" },
    { name: "All Books", link: "/all-books", role: "VIEW_ALL" },
  ];

  return (
    <div>
      <div className={isActive ? "sidebar active" : "sidebar"}>
        <div className="logo_content">
          <div className="logo">
            <div className="logo_name">Books Library</div>
          </div>
          <i className="bx bx-menu" id="btn" onClick={toggleClass}></i>
        </div>
        <ul className="nav_list">
          {pages.map(
            (page, i) =>
              userRoles.includes(page.role) && (
                <li key={i}>
                  <Link to={`${page.link}`}>
                    <i className="bx bx-book"></i>
                    <span className="links_name">{page.name}</span>
                  </Link>
                  <span className="tooltip">{page.name}</span>
                </li>
              )
          )}
          <li>
            <div onClick={() => logout()}>
              <Nav.Link>
                <i className="bx bx-log-out"></i>
                <span className="links_name">Logout</span>
              </Nav.Link>
            </div>
            <span className="tooltip">Logout</span>
          </li>
        </ul>
        <div className="content">
          <div className="user">
            <div className="user_details">
              {/* <img src="images/profile.jpg" alt="" /> */}
              <div className="name_job">
                <div className="name">{user.username}</div>
                <div className="email">{user.email}</div>
              </div>
            </div>
            <i
              className="bx bx-log-out"
              style={{ cursor: "pointer" }}
              id="log_out"
              onClick={logout}
            ></i>
          </div>
        </div>
      </div>
      <div className="home_content">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
