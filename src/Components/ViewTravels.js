import React, { useEffect, useState } from "react";
import Arrow from "../Assets/next.png";
import axios from "axios";
import { useRef } from "react";
import bus from "../Assets/bus.png";
import train from "../Assets/train.png";
import steering from "../Assets/steering-wheel.png";
import Footer from "./Footer";
import "../Styles/ViewTravels.css";
const ViewTravels = (props) => {
  const [travel, setTravel] = useState({});
  const [flag, setFlag] = useState(true);
  const source = useRef("");
  const destination = useRef("");
  const [flag1, setFlag1] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions,setDestinationSuggestions]=useState([])
  const date = useRef();

  const handleDestinationSuggestion=()=>{
    console.log(source.current.value);
    console.log(destination.current.value);
axios.get(`http://localhost:2022/get-all-routes-by-location/${source.current.value}/${destination.current.value}`)
.then((p)=>{
const {data}=p
setDestinationSuggestions(data)
},(e)=>{
console.log(e);
})
  }

  const getDestination=(suggestion)=>{
    document.getElementById(`destination`).value=suggestion
    setDestinationSuggestions([])
  }

  const handleSourceSuggestion = () => {
    axios
      .get(`http://localhost:2022/get-all-routes/${source.current.value}`)
      .then(
        (p) => {
          const { data } = p;
          setSourceSuggestions(data);
        },
        (e) => {
          console.log(e);
        }
      );
  };


  const getSource=(suggestion)=>{
    document.getElementById(`source`).value=suggestion
    setSourceSuggestions([])
  }



  const handleChange = (event, index) => {
    const newInputValues = [...genders];
    newInputValues[index] = event.target.value;
    setGenders(newInputValues);
  };
  const bookTickets = (busId) => {
    const map = new Map();
    bookedSeats.forEach((key, index) => {
      map.set(key, genders[index]);
    });

    console.log(source.current.value, `-------------`);
    console.log(destination.current.value);
    console.log(map);
    console.log(busId);
    console.log(props.customer.customerId);
    console.log(date.current.value, `---------------`);
    const seat = Object.fromEntries(map.entries());

    axios
      .post(`http://localhost:2022/book-bus`, {
        source: source.current.value,
        destination: destination.current.value,
        seatsWithGenders: seat,
        busId: busId,
        customerId: props.customer.customerId,
        seatReservedTo: date.current.value,
      })
      .then(
        (p) => {
          const { data } = p;
          if (data != null) {
            getTravels();
            setBookedSeats([]);
            document.getElementById(`alert`).style.display = `flex`;
          }
          setTimeout(() => {
            document.getElementById(`alert`).style.display = `none`;
          }, 2000);
        },
        (e) => {
          console.log(e);
        }
      );
    console.log(genders);
  };

  const selectSeat = (key, busId) => {
    console.log(key);
    if (bookedSeats.includes(key)) {
      const newBookedSeats = bookedSeats.filter((operand) => operand != key);
      setBookedSeats(newBookedSeats);
      document.getElementById(
        `${busId}icon${key}`
      ).style.backgroundColor = `lightgreen`;
    } else {
      setBookedSeats([...bookedSeats, key]);
      document.getElementById(
        `${busId}icon${key}`
      ).style.backgroundColor = `green`;
    }
  };

  const view = (p) => {
    if (flag1) {
      setFlag1(false);
      document.getElementById(p).style.display = "none";
    } else {
      setFlag1(true);
      document.getElementById(p).style.display = "";
    }
  };

  const getTravels = () => {
    setFlag(false);
    axios
      .get(
        `http://localhost:2022/get-by-source-destination/${source.current.value}/${destination.current.value}/${date.current.value}`
      )
      .then(
        (pos) => {
          const { data } = pos;
          setTravel(data);
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  return (
  
      <>
  <div className="container">
    <div className="row mt-3 justify-content-center align-items-center p-3">
      <div className={`col-md-3 ${props.width<520?`mt-3`:``}`}>
        <label  htmlFor="source" className={`${props.mode==`dark`?`gradient-text1`:`gradient-text`} form-label nun`}>Source</label>
        <input
          type="text"
          id="source"
          ref={source}
          style={{background:`none`,border:`none`,borderBottom:`1px solid ${props.mode==`dark`?`lightblue`:`darkblue`}`}}
          className={`form-control form-control-md ${props.mode==`dark`?`text-light`:`text-dark`}`}
          onChange={handleSourceSuggestion}
        />
        <div
          className="suggestions-container srollable-container"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid black",
            display: `${sourceSuggestions.length > 0 ? "block" : "none"}`,
            position: "absolute",
            width:`${props.width>400?`20%`:`80%`}`,
            backgroundColor: "#fff",
            zIndex: "1",
          }}
        >
          {sourceSuggestions.map((suggestion, index) => (
            <div onClick={() => getSource(suggestion)} key={index} className="suggestion-item">
              {suggestion}
            </div>
          ))}
        </div>
      </div>
      <div className={`col-auto ${props.width<520?`mt-3`:``}`}>
        <img src={Arrow} alt="Arrow" style={{ height: 50, width: 50 }} />
      </div>
      <div className={`col-md-3 ${props.width<520?`mt-3`:``}`}>
      <label  htmlFor="destination" className={`form-label nun ${props.mode==`dark`?`gradient-text1`:`gradient-text`}`}>Destination</label>
        <input
          type="text"
          id="destination"
          ref={destination}
          style={{background:`none`,border:`none`,borderBottom:`1px solid ${props.mode==`dark`?`lightblue`:`darkblue`}`}}
          className={`form-control form-control-md ${props.mode==`dark`?`text-light`:`text-dark`}`}
          onChange={handleDestinationSuggestion}
        />
        <div
          className="suggestions-container srollable-container"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid black",
            display: `${destinationSuggestions.length > 0 ? "block" : "none"}`,
            position: "absolute",
            width:`${props.width>400?`20%`:`80%`}`,
            backgroundColor: "#fff",
            zIndex: "1",
          }}
        >
          {destinationSuggestions.map((suggestion, index) => (
            <div onClick={() => getDestination(suggestion)} key={index} className="suggestion-item">
              {suggestion}
            </div>
          ))}
        </div>
      </div>
      <div className={`col-md-3 ${props.width<520?`mt-3`:``}`}>
        <label className={`form-label nun ${props.mode==`dark`?`gradient-text1`:`gradient-text`}`}  >Enter your date of birth</label>
        <input type="date" ref={date} 
        id="date"
        style={{color:`${props.mode==`dark`?`white`:`black`}`,background:`none`,border:`none`,borderBottom:`1px solid ${props.mode==`dark`?`lightblue`:`darkblue`}`}}
        className="form-control form-control-md" />
      </div>
      <div className={`col-md-auto d-flex justify-content-center ${props.width<520?`mt-3`:``}`}>
        <button className="btn btn-warning btn-lg" onClick={getTravels}>
          Search
        </button>
      </div>
    </div>
  </div>
  <div className="container">
    {Object.keys(travel) == 0 ? (
      flag ? (
        <div
          // style={{ height: `30vh`, width: `100vh` }}
          className="container d-flex justify-content-center align-items-center p-4"
        >
          <h1 className="serif gradient-text">Unleash Search Power</h1>
        </div>
      ) : (
        <div className="container d-flex justify-content-center align-items-center p-3">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      )
    ) : (
      <>
        <h3 className={`nun gradient-text2`}>Available Buses</h3>
        <div className="table-responsive">
          <table className={`table ${props.mode==`dark`?`table-dark`:`table-light`} table-striped table-hover nun`}>
            <thead>
              <tr className="text-center">
                <th>Travel Type</th>
                <th>BusId</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Routes</th>
              </tr>
            </thead>
            <tbody>
              {travel.availableBuses.map((e, i) => {
                return (
                  <>
                    <tr className="text-center">
                      <td>
                        <img
                          src={bus}
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: `10px`,
                          }}
                        ></img>
                      </td>
                      <td>{e.busId}</td>
                      <td>{e.source}</td>
                      <td>{e.destination}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => view(e.busId)}
                        >
                          View More
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} id={e.busId} style={{ display: `none` }}>
                        <div className="row">
                          <div className="col">
                            <div className="p-3" style={{ height: `200px` }}>
                              <div className="item d-flex">
                                {Object.entries(e.busSeating)
                                  .slice(0, 10)
                                  .map(([key, value]) => (
                                    <div
                                      style={{
                                        height: `10px`,
                                        width: `10px`,
                                        backgroundColor:
                                          value === null
                                            ? "lightgreen"
                                            : value
                                            ? "lightblue"
                                            : "lightpink",
                                        padding: `10px`,
                                        margin: `10px`,
                                      }}
                                      onClick={() => selectSeat(key, e.busId)}
                                      className={`seat d-flex justify-content-center align-items-center`}
                                      key={key}
                                    >
                                      <i
                                        className="fa fa-check-circle"
                                        id={`${e.busId}icon${key}`}
                                        style={{
                                          color: `lightgreen`,
                                          display: `${
                                            value != null ? `none` : ``
                                          }`,
                                        }}
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  ))}
                                <div className=" d-flex justify-content-center  align-items-center">
                                  <img
                                    src={steering}
                                    style={{
                                      height: 40,
                                      width: 40,
                                      position: `relative`,
                                      top: 124,
                                    }}
                                    className="mx-2"
                                  ></img>
                                </div>
                              </div>

                              <div className="item d-flex">
                                {Object.entries(e.busSeating)
                                  .slice(10, 20)
                                  .map(([key, value]) => (
                                    <div
                                      style={{
                                        height: `10px`,
                                        width: `10px`,
                                        backgroundColor:
                                          value === null
                                            ? "lightgreen"
                                            : value
                                            ? "lightblue"
                                            : "lightpink",
                                        padding: `10px`,
                                        margin: `10px`,
                                      }}
                                      onClick={() => selectSeat(key, e.busId)}
                                      className={
                                        "seat d-flex justify-content-center  align-items-center"
                                      }
                                      key={key}
                                    >
                                      <i
                                        className="fa fa-check-circle"
                                        id={`${e.busId}icon${key}`}
                                        style={{
                                          color: `lightgreen`,
                                          display: `${
                                            value != null ? `none` : ``
                                          }`,
                                        }}
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  ))}
                              </div>
                              <br></br>
                              <div className="item d-flex">
                                {Object.entries(e.busSeating)
                                  .slice(20, 30)
                                  .map(([key, value]) => (
                                    <div
                                      style={{
                                        height: `10px`,
                                        width: `10px`,
                                        backgroundColor:
                                          value === null
                                            ? "lightgreen"
                                            : value
                                            ? "lightblue"
                                            : "lightpink",
                                        padding: `10px`,
                                        margin: `10px`,
                                      }}
                                      onClick={() => selectSeat(key, e.busId)}
                                      className={
                                        "seat d-flex justify-content-center  align-items-center"
                                      }
                                      key={key}
                                    >
                                      <i
                                        className="fa fa-check-circle"
                                        id={`${e.busId}icon${key}`}
                                        style={{
                                          color: `lightgreen`,
                                          display: `${
                                            value != null ? `none` : ``
                                          }`,
                                        }}
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  ))}
                              </div>

                              <div className="item d-flex">
                                {Object.entries(e.busSeating)
                                  .slice(30, 40)
                                  .map(([key, value]) => (
                                    <div
                                      style={{
                                        height: `10px`,
                                        width: `10px`,
                                        backgroundColor:
                                          value === null
                                            ? "lightgreen"
                                            : value
                                            ? "lightblue"
                                            : "lightpink",
                                        padding: `10px`,
                                        margin: `10px`,
                                      }}
                                      onClick={() => selectSeat(key, e.busId)}
                                      className={
                                        "seat d-flex justify-content-center  align-items-center"
                                      }
                                      key={key}
                                    >
                                      <i
                                        className="fa fa-check-circle"
                                        id={`${e.busId}icon${key}`}
                                        style={{
                                          color: `lightgreen`,
                                          display: `${
                                            value != null ? `none` : ``
                                          }`,
                                        }}
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className=" mt-5 h-100 ">
                              <div className="item d-flex justify-content-around align-items-center">
                                <div
                                  className=""
                                  id="mens"
                                  style={{
                                    height: `20px`,
                                    width: `20px`,
                                    backgroundColor: `lightblue`,
                                  }}
                                ></div>
                                <label htmlFor="mens">Mens</label>
                              </div>
                              <div className="item d-flex justify-content-around align-items-center">
                                <div
                                  className="mx-2"
                                  id="women"
                                  style={{
                                    height: `20px`,
                                    width: `20px`,
                                    backgroundColor: `lightpink`,
                                  }}
                                ></div>
                                <label htmlFor="women">Women</label>
                              </div>
                              <div className="item d-flex justify-content-around align-items-center">
                                <div
                                  className="mx-3"
                                  id="available"
                                  style={{
                                    height: `20px`,
                                    width: `20px`,
                                    backgroundColor: `lightgreen`,
                                  }}
                                ></div>
                                <label htmlFor="available">Available</label>
                              </div>
                            </div>
                          </div>
                          <div className="col  d-flex justify-content-center align-items-center ">
                            {bookedSeats.length == 0 ? (
                              <div className="noto">
                                Please Select Seats To Book
                              </div>
                            ) : (
                              <div className="">
                                {bookedSeats.map((key, index) => {
                                  return (
                                    <div className="row mt-1">
                                      <div className="col nun">
                                        <span>Seat No: </span> {key}
                                      </div>
                                      <div className="col">
                                        <input
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                          className="form-control form-control-sm"
                                          name={key}
                                        ></input>
                                      </div>
                                    </div>
                                  );
                                })}
                                <div className="d-flex justify-content-center align-items-center">
                                  <button
                                    className="btn btn-sm btn-primary mt-2"
                                    onClick={() => bookTickets(e.busId)}
                                  >
                                    Book Tickets
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <h3 className="noto">Available Trains</h3>
        <div className="table-responsive">
          <table className="table table-light table-hover nun">
            <thead>
              <tr className="text-center">
                <th></th>
                <th>TrainId</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Routes</th>
              </tr>
            </thead>
            <tbody>
              {travel.availableTrains.map((e, i) => {
                return (
                  <>
                    <tr className="text-center">
                      <td>
                        <img
                          src={train}
                          style={{
                            height: 50,
                            width: 50,
                            borderRadius: `50px`,
                          }}
                        ></img>
                      </td>
                      <td>{e.trainId}</td>
                      <td>{e.source}</td>
                      <td>{e.destination}</td>
                      <td>
                        <button className="btn btn-success">View More</button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
  <Footer mode={props.mode}></Footer>
</>

    
  );
};

export default ViewTravels;
