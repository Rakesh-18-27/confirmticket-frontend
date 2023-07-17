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
      <div style={{ backgroundColor: `rgb(202, 206, 250)`,borderRadius:`20px`}} className="p-3">
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
              <div className="col mb-4">
                <div className="bg-white rounded p-3" style={{boxShadow:`3px 3px 14px black`}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="noto d-inline">From: </h6>
                      <span className="nun">{booking.from}</span>
                    </div>
                    <div>
                      {booking.vechilType === "BUS" ? (
                        <img src={bus} style={{ height: 40, width: 40 }} alt="Bus" />
                      ) : (
                        <img src={train} style={{ height: 40, width: 40 }} alt="Train" />
                      )}
                    </div>
                    <div>
                      <h6 className="noto d-inline">To: </h6>
                      <span className="nun">{booking.to}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <b className="noto">Booked Date:&nbsp;</b><span className="nun">{booking.ticketBookedOn}</span>
                  </div>
                  <div className="mt-2">
                    <b className="noto">Reseved Date:&nbsp;</b><span className="nun">{booking.ticketReservedOn}</span>
                  </div>
                  <div className="mt-2">
                    <b className="noto">Reseved SeatNo:&nbsp;</b><span className="nun">{booking.seatingNo}</span>
                  </div>
                  <div className="d-flex justify-content-around align-items-center mt-2">
                    <div>
                         <button onClick={()=>viewstatus(booking.bookingId)} className={`btn btn-success `}>View Status </button>
                    </div>
                    <div>
                         <button className={`btn btn-danger ${isCancel?(``):(`disabled`)}`}>Cancel </button>
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
                                <label htmlFor={`label${booking.bookingId}`}>
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Booking;
