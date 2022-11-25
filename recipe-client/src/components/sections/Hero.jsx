import React from 'react'
import "../../css/main.css"
import SearchBar from '../elements/SearchBar'
function Hero() {
  return (
    <div className="cnt">
      <h1>Create your own recipe or Search for your favorites</h1>
      <SearchBar />
    </div>
  )
}

export default Hero