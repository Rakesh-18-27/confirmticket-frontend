import React from 'react'

export default function PasswordStatus(props) {
  return (
    <>
{
  console.log(props.validate.str.length,`--yy----`)
}
    {
      
      props.validate.str.length==0?(<div></div>):(<div>
            <div id='stat' className='mt-2' style={{position:`relative`,width:`${props.validate.width}%`,height:`2px`,backgroundColor:`${props.validate.color}`}} ></div>
    <p htmlFor="stat" className="" style={{color:`${props.validate.color}`}}>
      {props.validate.str}</p>
      </div>)
    }
    
    </>
  )
}
