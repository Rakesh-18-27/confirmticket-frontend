import React, { useEffect, useRef, useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import ViewTravels from "./ViewTravels";
import App from "../App";
import Ticket from '../Assets/ticket.png';
import '../Styles/Navbar.css';
import Dashboard from './Dashboard';
import axios from "axios";
import Booking from "./Booking";
import Find from "./Find";
import Profile from "./Profile";

const Navbar = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [customer, setCustomer] = useState({});
  const name = useRef("");
  const email = useRef("");
  const gender = useRef("");
  const password = useRef("");
  const number = useRef("");
  const dob = useRef("");
  const [width,setWidth]=useState(window.innerWidth);
  const [image, setImage] = useState("");
  const [mode,setMode]=useState(`light`)

const handleMode=()=>{
  if(mode==`dark`){
    setMode(`light`)
    document.body.style.backgroundColor=`white`
  }else{
    setMode(`dark`)
    document.body.style.backgroundColor=`black`
  }
}


  const handleImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleCustomer = (e) => {
    setCustomer(e);
  };

  const saveUser = () => {
    console.log(image, `-----------`);
    axios.post(`http://localhost:2022/add-customer`, {
      "customerName": name.current.value,
      "customerEmail": email.current.value,
      "customerGender": gender.current.value,
      "password": password.current.value,
      "customerNumber": number.current.value,
      "customerDateOfBirth": dob.current.value,
      "image": image
    }).then((pos) => {
      const { data } = pos;
      if (data != null) {
        setFlag(true);
        navigate(`/login`);
      }
      console.log(pos);
    }, (err) => {
      console.log(err);
    });
  };
  useEffect(()=>{

    const handleResize=()=>{
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  },[])

  return (
    <>
      <div style={{position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }} className={`row git  rounded-30px ${mode==`dark`?`bg-black`:`bg-white`}`}>
        <div className="col-lg-8 col-md-4 e  d-flex align-items-center">
          <img src={Ticket} className="image-fluid p-2 d-inline" style={{ height: 70, width: 70 }} alt="Ticket" />
          <NavLink
            className={`navbar-brand gradient-text nun `}
            to="/"
            style={{ fontSize: "28px", fontWeight: "bolder" }}
          >
            ConfirmTkt
          </NavLink>
        </div>
        
        <div className="col-lg-4 col-md-8 col-12 d-flex justify-content-between align-items-center ">
          <NavLink to={"/"} className={`gradient-text1  navbar-link nun ${mode==`dark`?`text-light`:`text-dark`}`}><i className={`fa fa-home ${width<380?`mx-3`:`mx-3`}`} aria-hidden="true"></i>&nbsp;Home</NavLink>
          <NavLink to={"/viewtravels"} className={`gradient-text1 navbar-link nun ${mode==`dark`?`text-light`:`text-dark`}`}><i className={`fa fa-map-marker ${width<380?`mx-3`:`mx-3`}`} aria-hidden="true"></i>&nbsp;Travels</NavLink>
          <NavLink to={"/login"} className={`gradient-text1 navbar-link nun ${mode==`dark`?`text-light`:`text-dark`}`}><i className={`fa fa-sign-in ${width<380?`mx-3`:`mx-3`}`} aria-hidden="true"></i>&nbsp;Login</NavLink>
         {
          Object.keys(customer)==0?( <div className={`d-flex justify-content-center align-items-center"`}>
          <NavLink className={`gradient-text1 navbar-link nun ${mode==`dark`?`text-light`:`text-dark`}`} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className={`fa fa-user-plus ${width<380?`mx-3`:`mx-3`}`} aria-hidden="true"></i>&nbsp;Signup</NavLink>
        </div>):(<div></div>)
         }
          <div className={`d-flex justify-content-center align-items-center nun"`}>
            <NavLink className={`gradient-text1 navbar-link nun ${mode==`dark`?`text-light`:`text-dark`}`} onClick={handleMode}>
            {
              mode==`light`?(<><i style={{fontSize:`21px`}} className={`fa fa-moon-o ${width<380?`mx-3`:`mx-3`}`} aria-hidden="true"></i>&nbsp;&nbsp;{mode}<i className="fa fa-sun-o"></i></>):(<><i style={{fontSize:`21px`}} className={`fa fa-sun-o ${width<380?`mx-3`:`mx-3`}`} aria-hidden="true"></i>&nbsp;&nbsp;{mode}<i className="fa fa-moon-o"></i></>)
            }
            </NavLink>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content ${mode==`dark`?`bg-dark text-light`:`bg-light text-dark`}`}>
            <div className="modal-header">
              <h1 className="modal-title noto fs-5" id="exampleModalLabel">Create Account</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form- p-1">
                <input type="text" ref={name} className="form-control form-control-sm" placeholder="Enter Your Name"></input>
              </div>
              <div className="form-group p-1">
                <input type="email" ref={email} className="form-control form-control-sm" placeholder="Enter Your Email"></input>
              </div>

              <div className="form-check-inline p-1">
                <input className="form-check-input" type="radio" ref={gender} name="radioOptions" id="male" value="male" defaultChecked />&nbsp;
                <label className="form-check-label nun" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check-inline p-1">
                <input className="form-check-input" type="radio" ref={gender} name="radioOptions" id="female" value="female" />&nbsp;
                <label className="form-check-label nun" htmlFor="female">
                  Female
                </label>
              </div>

              <div className="form-group p-1">
                <input type="password" placeholder="Create Your Password" ref={password} className="form-control form-control-sm" />
              </div>
              <div className="form-group p-1">
                <input type="text" placeholder="Enter Your Number" ref={number} className="form-control form-control-sm" />
              </div>
              <div className="form-group p-1">
                <label htmlFor="dobInput nun">Enter Your Date of Birth:</label>
                <input type="date" id="dobInput" placeholder="YYYY-MM-DD" ref={dob} className="form-control form-control-sm" />
              </div>
              <div className="form-group p-1">
                <label htmlFor="image nun">Upload Your Image:</label>
                <input type="file" id="image" placeholder="Upload Image" onChange={handleImage} className="form-control form-control-sm" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={saveUser} data-bs-dismiss="modal">Create</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "70px", paddingTop: "20px" }}>
        {/* Content below the navbar */}
        <Routes>
          <Route path="/confirmticket-frontend/" element={<Home mode={mode} />} />
          <Route path="/" element={<Home mode={mode} />} />
          <Route path="/viewtravels" element={<ViewTravels width={width} mode={mode} />} />
          <Route path="/login" element={<App flag={flag} customer={handleCustomer} mode={mode} />} />
          <Route path="/dashboard" element={<Dashboard customer={customer} mode={mode} width={width}/>}>
            <Route path="/dashboard/" element={<ViewTravels customer={customer} mode={mode} width={width} />} />
            <Route path="/dashboard/bookings" element={<Booking mode={mode} customer={customer} />} />
            <Route path="/dashboard/find" element={<Find mode={mode} />} />
            <Route path="/dashboard/profile" element={<Profile mode={mode} customer={customer} />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default Navbar;
