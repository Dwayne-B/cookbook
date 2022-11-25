import React from 'react'
import { Link } from "react-router-dom"
import img from "../../assets/Vector.svg"
function NavLinks() {
  return (
    <div>
      <ul className="flex flex-row border sm:justify-end justify-center w-full px-5 py-2">
        <Link to="/" > <li className='mr-5 self-center'>Search Recipie</li></Link>

        <Link to='/full' >
          <li>
            <img src={img} alt="" />
          </li>
        </Link>
      </ul>



    </div >



  )
}

export default NavLinks




