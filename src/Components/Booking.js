import { useEffect, useState } from "react";
import axios from "axios";
import train from '../Assets/trainside.png';
import bus from '../Assets/sidebus.png';

const Booking = (props) => {
  const [bookings, setBookings] = useState([]);
const [flag,setFlag]=useState(false)


 const viewstatus=(bookingId)=>{
   
    if(flag){
        document.getElementById(bookingId).style.display=`none`
        setFlag(false)
    }else{
        document.getElementById(bookingId).style.display=`flex`
        setFlag(true)
    }
    
 }





  useEffect(() => {
    axios.get(`http://localhost:2022/get-bookings-by-userid/${props.customer.customerId}`)
      .then((pos) => {
        const { data } = pos;
        setBookings(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div  className="p-3">
        <div className="row row-cols-md-2 row-cols-lg-3">
          {bookings.map((booking, index) => {
              const isCancel=true
              const date=new Date(booking.ticketBookedOn)
              date.setHours(date.getHours+24)
              const currentDate=new Date()
  
              if(date<currentDate||date===currentDate){
                 isCancel= false;
              }
            return (
              <>
              
              <div className={`card ${props.mode==`dark`?`bg-dark text-light`:`bg-light text-dark`}`}>
    <div className="card-body">
      <h5 className="card-title">Bus Ticket</h5>
      <p className="card-text"><strong>Source:</strong> {booking.from}</p>
      <p className="card-text"><strong>Destination:</strong> {booking.to}</p>
      <p className="card-text"><strong>Booked Date:</strong> {booking.ticketBookedOn}</p>
      <p className="card-text"><strong>Reserved Date:</strong> {booking.ticketReservedOn}</p>
      <p className="card-text"><strong>Seat No:</strong> {booking.seatingNo}</p>
      <div className="d-flex justify-content-between justify-content-center">
        <button type="button" className="btn btn-primary"onClick={()=>viewstatus(booking.bookingId)}>View Status</button>
        <button type="button" className="btn btn-secondary">Cancel</button>
      </div>
      
    </div>
    <div id={booking.bookingId} style={{display:`none`}}>
                <div  className="scrollable-container mt-2" style={{height: `150px`, overflowY: `scroll`}}>
                    <p className="noto text-center  p-1 w-100" style={{position:`sticky`,top:0,backgroundColor:`rgb(137, 214, 150)`}}>{booking.vechilType} Status</p>
                    <div className="row"  >
                        {
                        booking.routes.map((route,index)=>{
                            return(
                            <div className="col mt-2">
                                <div id={`label${booking.bookingId}`} className="" style={{height:`20px`,width:`20px`,backgroundColor:`${route.split(" ").length>=3?(`lightgreen`):(`lightblue`)}`,borderRadius:`50px`}}></div>
                                <label className={`${props.mode==`dark`?`text-light`:`text-dark`}`} htmlFor={`label${booking.bookingId}`}>
                                {
                                    route.split(" ").length>=3?(route.split(" ")[0]):(route)
                                }
                                </label>
                            </div>
                            )
                        })
                        }
                    </div>
                </div>
                </div>
  </div>
 
  </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Booking;
