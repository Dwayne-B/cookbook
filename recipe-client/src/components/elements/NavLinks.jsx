import React from 'react'
import { Link } from "react-router-dom"
import img from "../../assets/Vector.svg"
function NavLinks() {
  return (
    <div className=" sticky bg-yellow-800  opacity-90 z-10 top-0 ">
      <ul className="  px-4 py-2 flex flex-row sm:justify-end justify-center items-center">
        <Link to="/" > <li className='mr-5 '>Search Recipie</li></Link>

        <Link to='/SavedCardsPage' >
          <li>
            <img src={img} alt="" />
          </li>
        </Link>
      </ul>



    </div >



  )
}

export default NavLinks




