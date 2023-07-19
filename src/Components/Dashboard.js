import { NavLink, Outlet } from "react-router-dom";
import "../Styles/Dashboard.css";
import { useEffect, useState } from "react";

const Dashboard = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {props.width < 500 ? (
        // Render the mobile version with a button
        <div
          style={{
            borderRadius: "10px",
            position: "fixed",
            top: 70,
            left: 0,
            right: 0,
          }}
          className={`row p-2 mt-5 nun ${
            props.mode === "dark" ? "bg-black" : "bg-light"
          } d-flex justify-content-around align-items-center`}
        >
          <div
            className={`col-12 `}
          >
            <button
              className={`navbar-link1 gradient-text3 ${props.mode==`dark`?`btn btn-black`:`btn btn-white`}`}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
              onClick={handleMenuToggle}
             
            >
              <i
                className="fa fa-bars"
               
              ></i>
              &nbsp;Menu
            </button>
          </div>
        </div>
      ) : (
        // Render the full navigation for larger screens
        <div
          // style={{ borderRadius: "10px", position: "fixed", top: 70, left: 0, right: 0 }}
          className={`row p-2 mb-5 nun ${
            props.mode === "dark" ? "bg-black" : "bg-light"
          } d-flex fixed justify-content-around align-items-center`}
        >
          <div
            className={`col-auto col-lg-auto d-flex justify-content-center align-items-center`}
          >
            <NavLink
              className={`navbar-link1 gradient-text3`}
              to={`/dashboard/`}
            >
              <i
                className="fa fa-search"
               
              ></i>
              &nbsp;Search
            </NavLink>
          </div>
          <div
            className={`col-auto col-lg-auto d-flex justify-content-center align-items-center`}
          >
            <NavLink
              className={`navbar-link1 gradient-text3`}
              to={`/dashboard/bookings`}
             
            >
              {" "}
              <i
                className="fa fa-ticket"
                
              ></i>
              &nbsp;My Bookings
            </NavLink>
          </div>
          <div
            className={`col-auto col-lg-auto d-flex justify-content-center align-items-center`}
          >
            <NavLink
              className={`navbar-link1 gradient-text3`}
             
              to={`/dashboard/find`}
            >
              <i
                className="fa fa-map-marker"
                
                aria-hidden="true"
              ></i>
              &nbsp;Find status
            </NavLink>
          </div>
          <div
            className={`col-auto col-lg-auto d-flex justify-content-center align-items-center`}
          >
            <NavLink
              className={`navbar-link1 gradient-text3`}
              
              to={`/dashboard/profile`}
            >
              <i
                className="fa fa-user-circle-o"
                
              ></i>
              &nbsp;My Profile
            </NavLink>
          </div>
        </div>
      )}
      <div className="container mt-5">
        <Outlet></Outlet>
      </div>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className={`modal-content ${
              props.mode == `dark` ? `bg-dark text-light` : `bg-light text-dark`
            }`}
          >
            <div className="modal-header ">
              <h1 className="modal-title noto fs-5 gradient-text1" id="exampleModalLabel">
               
                <i
                  className="fa fa-bars "
                 
                ></i>
                &nbsp;Menu
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="list-unstyled ">
                <li className="mt-2 "  data-bs-dismiss="modal">
                  <NavLink
                    className={`navbar-link1 gradient-text3`}
                   
                    to={`/dashboard/`}
                  >
                    <i
                      className="fa fa-search"
                      
                    ></i>
                    &nbsp;Search
                  </NavLink>
                </li>
                <hr></hr>
                <li className="mt-2 " data-bs-dismiss="modal">
                  <NavLink
                    className={`navbar-link1 gradient-text3`}
                    to={`/dashboard/bookings`}
                  >
                    {" "}
                    <i
                      className="fa fa-ticket"
                    ></i>
                    &nbsp;My Bookings
                  </NavLink>
                </li>
                <hr></hr>
                <li className="mt-2" data-bs-dismiss="modal">
                  <NavLink
                    className={`navbar-link1 gradient-text3`}
                   
                    to={`/dashboard/find`}
                  >
                    <i
                      className="fa fa-map-marker"
                     
                      aria-hidden="true"
                    ></i>
                    &nbsp;&nbsp;Find status
                  </NavLink>
                </li>
                <hr></hr>
                <li className="mt-2" data-bs-dismiss="modal">
                  <NavLink
                    className={`navbar-link1 gradient-text3`}
                   
                    to={`/dashboard/profile`}
                  >
                    <i
                      className="fa fa-user-circle-o"
                     
                    ></i>
                    &nbsp;My Profile
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
