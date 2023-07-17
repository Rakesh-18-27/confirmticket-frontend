  import logo from "./logo.svg";
  import "./App.css";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import open from './Assets/panda1.png'
  import closed from './Assets/panda2.png'
  import Footer from "./Components/Footer";
  function App(props) {

    const navigate = useNavigate();
    const id = useRef(0);
const [customer,setCustomer]=useState({})
    const email=useRef()
    const password=useRef()

    const [panda,setPanda]=useState("")
    const [flag,setFlag]=useState(false)


    const login = () => {
      axios.post(`http://localhost:2022/login/${email.current.value}/${password.current.value}`).then(
        (pos) => {
          const { data } = pos;
          console.log(data,`-------------`)
          if (data!=null) {
            props.customer(data)
            navigate("/dashboard")
          }
        },
        (err) => {
          console.log(err)
        }
      );
    };


  const handleOnChange=(event)=>{
  setPanda(closed)
  }
  const handleMouseDown=()=>{
    setPanda(open)
  }




  useEffect(()=>{
  setPanda(open)
  },[])

    return (
      <>
      {props.flag ? (
        <div
          className="alert alert-info alert-dismissible fade show mt-2"
          role="alert"
        >
          <span className="nun">
            <i className="fa fa-check-circle" aria-hidden="true"></i>&nbsp;Registration Successful
          </span>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        <></>
      )}
      <div className="row d-flex justify-content-center mt-2">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-5">
          <div className="form-group d-flex justify-content-center">
            <img
              className="img-fluid"
              style={{ height: 70, width: 70 }}
              src={panda}
              alt="Panda"
            />
          </div>
          <div className="form-group p-2">
            <input
              type="text"
              onMouseDown={handleMouseDown}
              ref={email}
              placeholder="Enter Email"
              className="form-control"
            />
          </div>
          <div className="form-group p-2">
            <input
              type="password"
              onMouseDown={handleOnChange}
              ref={password}
              placeholder="Enter Password"
              className="form-control"
            />
          </div>
          <div className="form-group p-2 d-flex justify-content-around">
            <button type="reset" className="btn btn-danger">
              Reset
            </button>
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer mode={props.mode}></Footer>
    </>
    
    );
  }

  export default App;
