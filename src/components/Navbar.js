import React from 'react';
import { Link } from 'react-router-dom'


//get button name and path for evaery component
const Navbar = (props) => {

  return (
    <div className='navbar'>
      <div  className ="logo">
        
        <span className='brand-first-half'>ALBUMS LIST</span>


      </div>
      <Link className='btn' to={props.path}><button>{props.page}</button></Link>
    </div>
  )
}

export default Navbar
