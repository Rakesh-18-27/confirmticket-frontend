import logo from "./logo.svg";
  import "./App.css";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import open from './Assets/panda1.png'
  import closed from './Assets/panda2.png'
  import Footer from "./Components/Footer";
import PasswordStatus from "./Components/PasswordStatus";
  function App(props) {

    const navigate = useNavigate();
    const id = useRef(0);
const [customer,setCustomer]=useState({})
    const email=useRef()
    const password=useRef()

    const [panda,setPanda]=useState("")
    const [flag,setFlag]=useState(false)
    const [validate,setValidate]=useState({
      "str":``,
      "color":`white`
    })


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

    const validatePassword=()=>{
   
      let p=password.current.value
      console.log(p,`------`);
      const capital = /[A-Z]/;
      const num = /[0-9]/;
      if(p.length==0){
        console.log(p.length,`--------`);
        setValidate({
          "str":``,
          "color":``,
          "width":``
        })
      }

      if(p.length<6||!p.match(capital)||!p.match(num)){
                setValidate({
                  "str":"Weak",
                  "color":"red",
                  "width":"30"
                })
      }
       if(p.length>6&&(p.match(capital)||p.match(num))){
        setValidate({
          "str":"Medium",
          "color":"orange",
          "width":"60"
        })
      }
       if(p.length>6&&p.match(capital)&&p.match(num)){
        setValidate({
          "str":"Strong",
          "color":"green",
          "width":"100"
        })
      }
    }

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
              style={{ height: 70, width: 70 ,borderRadius:`50px 50px 50px 50px`}}
              src={panda}
              alt="Panda"
            />
          </div>
          <div className=" p-2">
          {/* <input
              type="text"
              onMouseDown={handleMouseDown}
              ref={email}
              placeholder="Enter Email"
              style={{background:`none`,border:`none`,borderBottom:`1px solid ${props.mode==`dark`?`lightblue`:`darkblue`}`}}
              className="form-control form-control-md"
            /> */}
            <label className={`form-label ${props.mode==`dark`?`gradient-text`:`gradient-text1`}`}>Email</label>
            <input
          type="text"
          id="email"
          ref={email}
          style={{background:`none`,border:`none`,borderBottom:`1px solid ${props.mode==`dark`?`lightblue`:`darkblue`}`}}
          className={`form-control form-control-md ${props.mode==`dark`?`text-light`:`text-dark`}`}
          onMouseDown={handleMouseDown}
        />
          </div>
          <div className="p-2">
          <label className={`form-label ${props.mode==`dark`?`gradient-text`:`gradient-text1`}`}>Password</label>
            <input
          type="password"
          id="password"
          ref={password}
          onChange={validatePassword}
          style={{background:`none`,border:`none`,borderBottom:`1px solid ${props.mode==`dark`?`lightblue`:`darkblue`}`}}
          className={`form-control form-control-md ${props.mode==`dark`?`text-light`:`text-dark`}`}
          onMouseDown={handleOnChange}
        />
        <PasswordStatus validate={validate}></PasswordStatus>
            {/* <input
              type="password"
              onMouseDown={handleOnChange}
              ref={password}
              style={{backgroundColor:`transperent`,border:`none`,borderBottom:`1px solid ${props.mode==`dark`?`lightblue`:`darkblue`}`}}
              className="form-control form-control-md"
            /> */}
            
          </div>

          <div className="form-group">
            <p className={`form-text text-danger mx-2`}>Forgot Your Password ?</p>
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