const Footer=(props)=>{
return(<>

<div className={`container ${props.mode==`dark`?`text-light`:`text-dark`}`}>
                 <h4 className="noto">Explore India:</h4>
                 <div className="row noto d-flex justify-content-around">
                   <div className="col-auto">
                     <img
                       src="https://wallpapercave.com/dwp2x/wp10257499.jpg"
                       style={{ height: 100, width: 150, borderRadius: `10px` }}
                     ></img>
                     <p className="text-center">Hyderabad</p>
                   </div>
                   <div className="col-auto">
                     <img
                       src="https://wallpapercave.com/dwp2x/wp7526620.jpg"
                       style={{ height: 100, width: 150, borderRadius: `10px` }}
                     ></img>
                     <p className="text-center">Mumbai</p>
                   </div>
                   <div className="col-auto">
                     <img
                       src="https://c4.wallpaperflare.com/wallpaper/404/633/114/5bd34ad9b11a2-wallpaper-preview.jpg"
                       style={{ height: 100, width: 150, borderRadius: `10px` }}
                     ></img>
                     <p className="text-center">Goa</p>
                   </div>
                   <div className="col-auto">
                     <img
                       src="https://wallpapercave.com/dwp2x/wp3917475.jpg"
                       style={{ height: 100, width: 150, borderRadius: `10px` }}
                     ></img>
                     <p className="text-center">Delhi</p>
                   </div>
                   <div className="col-auto">
                     <img
                       src="https://wallpapercave.com/dwp2x/wp9292770.jpg"
                       style={{ height: 100, width: 150, borderRadius: `10px` }}
                     ></img>
                     <p className="text-center">Kolkota</p>
                   </div>
                   <div className="col-auto">
                     <img
                       src="https://wallpapercave.com/dwp2x/wp7537467.jpg"
                       style={{ height: 100, width: 150, borderRadius: `10px` }}
                     ></img>
                     <p className="text-center">Banglore</p>
                   </div>
                 </div>
               </div>



<footer className="bg-black text-white">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 serif">
            <h5>Contact Details</h5>
            <p>Address: ....</p>
            <p>Phone: 9110342725</p>
            <p>Email: kandhalarakesh@mail.com</p>
          </div>
          <div className="col-lg-6">
            <h5>Follow Us</h5>
            <div className="d-flex">
              <a href="#" className="me-3"><i className="fa fa-facebook">&nbsp;facebook</i></a>
              <a href="#" className="me-3"><i className="fa fa-twitter" style={{color:`lightblue`}}>&nbsp;twitter</i></a>
              <a href="#" className="me-3"><i className="fa fa-instagram" style={{color:`lightpink`}}>&nbsp;instagram</i></a>
              <a href="#" className="me-3"><i className="fa fa-linkedin">&nbsp;linkedin</i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
</>)
}
export default Footer