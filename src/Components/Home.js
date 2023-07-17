import React from "react";
import '../Styles/Home.css';
import Footer from "./Footer";
const Home = (props) => {
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="containerr">
            <h1 style={{ fontSize: "70px", fontWeight: "bolder" }} className="gradient-text nun">Book Ticket<br /> Now</h1>
            <button className="btn btn-outline-primary btn-lg">Search Travels</button>
          </div>
        </div>
      </div>
    </div>
    <Footer mode={props.mode}></Footer>
    </>
  );
};

export default Home;
