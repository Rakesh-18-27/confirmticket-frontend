import { NavLink,Outlet,Route,Routes } from "react-router-dom"
import '../Styles/Navbar.css'
import view from '../Assets/view.png'
import booking from '../Assets/booking.png'
import ViewTravels from "./ViewTravels"
const Dashboard=(props)=>{
    return(
        <>
       <div style={{boxShadow:`inset 1px 1px 10px 1px`,borderRadius:`10px`, background:`linear-gradient(0deg,#9595ff,white)`,position:`fixed`,top:84,left:0,right:0}} className="row p-2 mb-5 nun d-flex justify-content-around align-items-center">
            <div className="col-auto col-lg-auto d-flex justify-content-center align-items-center">
                <img src={view} style={{height:22,width:22,color:`red`}}></img>
            <NavLink className={"navbar-link"} to={`/dashboard/`}>View Travels</NavLink>
            </div>
            <div className="col-auto col-lg-auto d-flex justify-content-center align-items-center">
            <img src={booking} style={{height:22,width:25}}></img>
            <NavLink className={"navbar-link"} to={`/dashboard/bookings`}>My Bookings</NavLink>
            </div>
            <div className="col-auto col-lg-auto d-flex justify-content-center align-items-center">
           
                <i className="fa fa-map-marker" aria-hidden="true"></i>
            <NavLink className={"navbar-link"} to={`/dashboard/find`}>find status</NavLink>
            </div>
            <div className="col-auto col-lg-auto">
            {/* <i className="fa fa-user-circle-o" aria-hidden="true"></i> */}
            <img src={props.customer.image} style={{height:30,width:30,borderRadius:`50px`}}></img>
            <NavLink className={"navbar-link"} to={`/dashboard/profile`}>My Profile</NavLink>
            </div>
       
       </div>
       <div className="container mt-5">
        <Outlet></Outlet>
       </div>



        </>
    )
}
export default Dashboard